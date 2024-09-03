import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  foodCatagoriesData:any=[]
  foodItems:any=[]
  foodCatagoriesId:any=null
  tableNo:any

  //billing
  customerName: string = '';
  billingData: any[] = [
    { itemname: 'vadapav', price: 10, quantity: 50 },
    { itemname: 'pavbhaji', price: 5, quantity: 20 },
    { itemname: 'misal', price: 4, quantity: 40 },
    { itemname: 'misal', price: 4, quantity: 40 }
  ];
  totalAmount: number = 0;


  constructor(private router: Router,private menuService:MenuService,private socketService: SocketService,private route: ActivatedRoute) {
    this.updateTotal();
   }


  ngOnInit(): void {
     this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.tableNo=params['id']
    });
    
    //food Catagories service
    // this.menuService.getFoodCategorories().subscribe(res=>{
    //   console.log(res,'res');
    //   this.foodCatagoriesData=res.data
    // })

    //food Items service

    this.socketService.getFoodCategory().subscribe(data => {
      console.log(data,'data food category');
      this.foodCatagoriesData=data
      
    });
    // this.socketService.getOrdersItems().subscribe(res=>{
    //   console.log(res,'res======');
      
    // })
    // this.socketService.getFoodItems().subscribe(data => {
    //   console.log(data,'data items');
      
    // });
  }

  getFoodList(data:any){
    console.log(data,'data');
    // this.foodCatagoriesId=data.foodCategoryId
    // this.menuService.getFoodItems(this.foodCatagoriesId).subscribe(res=>{
    //   this.foodItems=res.data
    // })
    this.foodCatagoriesId=data._id
    this.socketService.getFoodItemsByCategoryId(data._id).subscribe(res=>{
      console.log(res,'res====');
      this.foodItems=res
      console.log(this.foodItems,'this.foodItems');
      
    })
  }
  getFoodItem(data:any){
    console.log(data,'item');
    this.socketService.createOrders(this.tableNo,data._id).subscribe(res=>{
      console.log(res,'hello');  
    })
  }

  updateTotal() {
    this.totalAmount = this.billingData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  removeItem(index: number) {
    this.billingData.splice(index, 1);
    this.updateTotal();
  }

  pay() {
    alert(`Total amount to pay is: ${this.totalAmount}`);
  }
  
 isExpanded = false;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
