import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.getAllOrdersAdminItems().subscribe(res=>{
      console.log(res,'res----');
      
    })
  }

}
