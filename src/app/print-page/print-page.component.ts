import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit {
  orderData:any
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.getOrdersItems().subscribe((res: any) => {
      this.orderData = res
    })
  }

}
