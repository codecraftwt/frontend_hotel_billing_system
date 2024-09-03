import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

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
  // billingData: any[] = [
  //   // { itemname: 'vadapav', price: 10, quantity: 50 },
  //   // { itemname: 'pavbhaji', price: 5, quantity: 20 },
  //   // { itemname: 'misal', price: 4, quantity: 40 },
  //   // { itemname: 'misal', price: 4, quantity: 40 }
  // ];
  billingData: any
  totalAmount: number = 0;
  tableNo: any
  constructor(private socketService: SocketService, private route: ActivatedRoute) {
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

  update(data: any) {
    console.log(data);
    this.socketService.updateOrderQty(this.tableNo, data.foodItemId, data.quantity).subscribe(res => {
      console.log(res, 'test');

    })
  }
  deleteOrder(data: any) {
    console.log(data);
    this.socketService.updateOrderQty(this.tableNo, data.foodItemId, data.quantity).subscribe(res => {
      console.log(res, 'test');

    })
  }

  updateDiscount(data: any) {
    console.log(data, 'data');
    this.socketService.updateDiscount(this.tableNo, data.discountPercent).subscribe(res => {
      console.log(res, 'test');

    })
  }
  addCustomerName(data:any){
    this.socketService.addCustomerName(this.tableNo, data.customerName).subscribe(res => {
      console.log(res, 'test');

    })
  }
  changeOrderStatus() {
    this.socketService.updateOrderStatus(this.tableNo, 'completed').subscribe(res => {
      console.log(res, 'test');
     this.initialmethod()

    })
  }

  // updateTotal() {
  //   this.totalAmount = this.billingData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // }

  removeItem(data: any) {
    this.socketService.deleteOrder(this.tableNo, data.foodItemId).subscribe(res => {
      console.log(res, 'test');
    })
  }

  pay() {
    alert(`Total amount to pay is: ${this.totalAmount}`);
  }

  isExpanded = false;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ammount(data:any){
    this.remaingAmmount=data-this.billingData.afterDiscountPrice
  }
  printPage() {
    window.print();
  }
}
