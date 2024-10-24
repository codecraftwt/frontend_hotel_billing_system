import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { SocketService } from 'src/app/services/socket.service';
import { SoundService } from 'src/app/services/sound.service';

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

  data: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';


  //billing
  customerName: string = '';
  billingData: any[] = [
    { itemname: 'vadapav', price: 10, quantity: 50 },
    { itemname: 'pavbhaji', price: 5, quantity: 20 },
    { itemname: 'misal', price: 4, quantity: 40 },
    { itemname: 'misal', price: 4, quantity: 40 }
  ];
  totalAmount: number = 0;


  constructor(private router: Router,private menuService:MenuService,private socketService: SocketService,private route: ActivatedRoute,private sound:SoundService) {
    this.updateTotal();
   }


  ngOnInit(): void {
     this.route.params.subscribe(params => {
      this.tableNo=params['id']
    });
    
    this.socketService.getFoodItems().subscribe(data => {
      this.data = data;
    });
    setTimeout(() => {
      this.socketService.getFoodCategory().subscribe(res => {
        res.forEach(category => {
          this.foodCatagoriesData.push({
            _id:category._id,
            name: category.name,
            count: this.data.filter(item => item.category.name === category.name).length,
          });
        });
      });
    }, 5);

  }

  getFoodList(data:any){
    this.sound.playSound()
    this.foodCatagoriesId=data._id
    this.socketService.getFoodItemsByCategoryId(data._id).subscribe(res=>{
      this.foodItems=res
    })
  }
  getFoodItem(data:any){
    this.sound.playSound()
    this.socketService.createOrders(this.tableNo,data._id).subscribe(res=>{
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

  onSearch(): void {
    this.filteredData = this.socketService.searchData(this.data, this.searchTerm);
  }
}
