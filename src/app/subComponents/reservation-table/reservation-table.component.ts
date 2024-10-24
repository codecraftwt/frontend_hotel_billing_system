import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent implements OnInit {
  reservationName: string = '';
  numberOfPeople: number|null = 1;
  tableNumber: number|null = 1;
  userPhoneNumber: string = '';
  reservationDateTime: string = '';
  reservationList:any
  constructor(private service:SocketService) {}

  ngOnInit(): void {
    this.service.getAllReservation().subscribe(res => {
      this.reservationList=res
    })
  }

  onSubmit(): void {
    const reservationData = {
      reservationName: this.reservationName,
      numberOfPeople: this.numberOfPeople,
      tableNumber: this.tableNumber,
      userPhoneNumber: this.userPhoneNumber,
      reservationDateTime: this.reservationDateTime,
    };
    this.service.createReservation(reservationData).subscribe(res=>{
      this.resetForm();
      this.view = 'list';
    })
  }
  view: 'form' | 'list' | 'buttons' = 'buttons'; 

  toggleView(selectedView: 'form' | 'list'|'buttons') {
    this.view = selectedView;
  }

  resetForm() {
    this.reservationName = '';
    this.numberOfPeople = null;
    this.tableNumber = null;
    this.userPhoneNumber = '';
    this.reservationDateTime = '';
  }
  deleteReservation(data: any) {
    this.service.reservationCancel(data._id).subscribe(res=>{
      this.service.updateTableStatus(data.tableNumber, 'blank table').subscribe(res => {
      })
    })
  }

}
