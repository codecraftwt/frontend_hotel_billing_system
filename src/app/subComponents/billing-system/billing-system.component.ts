import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/services/socket.service';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-billing-system',
  templateUrl: './billing-system.component.html',
  styleUrls: ['./billing-system.component.css']
})
export class BillingSystemComponent implements OnInit {

  //billing
  customerName: string = '';
  customerAmmount: any;
  remaingAmmount:any
  billingData: any
  totalAmount: number = 0;
  tableNo: any
  constructor(private socketService: SocketService, private route: ActivatedRoute,private toastr: ToastrService,private sound:SoundService) {
    // this.updateTotal();
  }

  ngOnInit(): void {
    this.initialmethod()
    
  }

  initialmethod(){
    this.route.params.subscribe(params => {
      // console.log(params) //log the entire params object
      // console.log(params['id']) //log the value of id
      this.tableNo = params['id']
      this.socketService.fetchOrders(params['id'])
      this.customerAmmount=''
      this.remaingAmmount=''
    });
    this.socketService.getOrdersItems().subscribe((res: any) => {
      console.log(res, 'order get');
      console.log(JSON.stringify(res), 'order get');
      this.billingData = res
      if (res?._id) {
        this.socketService.updateTableWithOrder(res?.tableNo, res?._id)
      }
    })
  }

  update(data: any,qty:any) {
    this.sound.playSound()
    console.log(data,qty);
    this.socketService.updateOrderQty(this.tableNo, data.foodItemId, qty,data.createdAt).subscribe(res => {
      console.log(res, 'test');
      this.initialmethod()
    })
  }
  addNote(data: any) {
    this.sound.playSound()
    console.log(data);
    this.socketService.updateOrderNote(this.tableNo, data.foodItemId, data.orderNote,data.createdAt).subscribe(res => {
      console.log(res, 'test');
      this.initialmethod()
    })
  }
  // deleteOrder(data: any) {
  //   console.log(data);
  //   this.socketService.updateOrderQty(this.tableNo, data.foodItemId, data.quantity).subscribe(res => {
  //     console.log(res, 'test');
  //     this.initialmethod()
  //   })
  // }

  updateDiscount(data: any) {
    console.log(data, 'data');
    this.socketService.updateDiscount(this.tableNo, data.discountPercent).subscribe(res => {
      console.log(res, 'test');
      this.initialmethod()
    })
  }
  addCustomerName(data:any){
    this.socketService.addCustomerName(this.tableNo, data.customerName).subscribe(res => {
      console.log(res, 'test');
      this.initialmethod()
    })
  }
  addCustomerNumber(data:any){
    this.socketService.addCustomerNumber(this.tableNo, data.customerNo).subscribe(res => {
      console.log(res, 'test');
      this.initialmethod()
    })
  }
  changeOrderStatus() {
    this.sound.playSound()
    this.socketService.updateOrderStatus(this.tableNo, 'completed').subscribe(res => {
      console.log(res, 'test');
      this.socketService.updateTableStatus(this.tableNo,'blank table').subscribe(res=>{
        this.initialmethod()
      })
    //  this.initialmethod()

    })
  }

  confirmorder(data:any){
    this.sound.playSound()
    console.log(data,'data----');
    if(data.customerName!==null){
      this.socketService.updateOrderKotStatus(this.tableNo, 'confirmed').subscribe(res=>{
        // console.log(res,'koy');
        this.toastr.success('Order has been sent to the kitchen!', 'Order Status');
        this.socketService.updateTableStatus(this.tableNo,'KOT table').subscribe(res=>{
          this.initialmethod()
        })
      })
    }else{
      this.toastr.warning('Please enter customer name', 'Customer Name Required');
    }
  }

  paymentType(type:any){
    this.sound.playSound()
    this.socketService.updatePaymentType(this.tableNo,type).subscribe(res=>{
      this.initialmethod()
    })
  }

  // updateTotal() {
  //   this.totalAmount = this.billingData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // }

  removeItem(data: any) {
    this.sound.playSound()
    console.log(JSON.stringify(data),'data');
    
    this.socketService.deleteOrder(this.tableNo, data.foodItemId,data.createdAt).subscribe(res => {
      console.log(res, 'test');
      if(res.message=='Order deleted'){
        this.socketService.updateTableStatus(this.tableNo,'blank table').subscribe(res=>{
          this.initialmethod()
        })
      }
      this.initialmethod()
    })
  }

  pay() {
    alert(`Total amount to pay is: ${this.totalAmount}`);
  }

  isExpanded = false;

  toggle() {
    this.sound.playSound()
    this.isExpanded = !this.isExpanded;
  }

  ammount(data:any){
    this.sound.playSound()
    this.remaingAmmount=data-this.billingData.afterDiscountPrice
  }
  printPage() {
    this.sound.playSound()
    window.print();
  }

  getStyles(type: string, status: string): { [key: string]: string } {
    const borderColor = this.getBorderColor(type);
    const backgroundColor = this.getBackgroundColor(status);

    return {
      'border-left': borderColor,
      ...backgroundColor
    };
  }

  getBackgroundColor(status: string): { [key: string]: string } {
    switch (status) {
      case 'working':
        return { 'background-color': '#f4f456', 'color': 'black' }; // Yellowish color
      case 'ready':
        return { 'background-color': '#74da74' }; // Green color
      case 'on hold':
        return { 'background-color': '#2D2D2D', 'color': 'white' }; // Dark gray color
      default:
        return { 'background-color': '#2D2D2D', 'color': 'white' }; // Default dark gray color
    }
  }

  getBorderColor(type: string): string {
    switch (type) {
      case 'Vegetarian':
        return '8px solid #48eb48'; // Green color
      case 'Non-Vegetarian':
        return '8px solid #ff2f2f'; // Red color
      case 'Soups':
        return '8px solid orange'; // Orange color
      default:
        return '8px solid black'; // Default border color
    }
  }
}