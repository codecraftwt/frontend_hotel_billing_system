import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-kds',
  templateUrl: './kds.component.html',
  styleUrls: ['./kds.component.css']
})
export class KdsComponent implements OnInit {
  data:any
  cards = [
    { title: 'Table 1', content: 'Content for card 1' },
    { title: 'Table 2', content: 'Content for card 2' },
    { title: 'Table 3', content: 'Content for card 3' },
    { title: 'Table 4', content: 'Content for card 4' },
    { title: 'Table 5', content: 'Content for card 5' }
  ];
  foodItems = [
    { img: 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg', name: 'Food Item 1' },
    { img: 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg', name: 'Food Item 2' },
    { img: 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg', name: 'Food Item 3' },
    { img: 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg', name: 'Food Item 4' },
    { img: 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg', name: 'Food Item 5' }
  ];
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.getAllOrdersItems().subscribe(res=>{
      console.log(res,'res=========test');
      this.data=res
      console.log(this.data,'this.data');
      
    })
  }

  statusUpdate(tableNo:any,foodItemId:any,status:any){
    this.socketService.updateFoodItemStatus(tableNo,foodItemId,status).subscribe(res=>{
      console.log(res,'update');
      
    })
  }

}
