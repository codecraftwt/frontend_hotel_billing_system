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
      console.log(res, 'reservation data===');
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
    console.log('Reservation Data:', reservationData);
    this.service.createReservation(reservationData).subscribe(res=>{
      console.log(res,'res');
      this.resetForm();
      this.view = 'list';
    })
    // Here you can send the reservationData to a service or API
  }
  view: 'form' | 'list' | 'buttons' = 'buttons'; // Start with button view
  // reservationName: string = '';
  // numberOfPeople: number | null = null;
  // tableNumber: number | null = null;
  // userPhoneNumber: string = '';
  // reservationDateTime: string = '';

  // Dummy data for reservation list
  // reservationList: Array<any> = [];

  // onSubmit() {
  //   const reservation = {
  //     name: this.reservationName,
  //     people: this.numberOfPeople,
  //     table: this.tableNumber,
  //     phone: this.userPhoneNumber,
  //     dateTime: this.reservationDateTime,
  //   };
    
  //   this.reservationList.push(reservation);
  //   this.resetForm();
  //   this.view = 'list'; // Switch to reservation list after submission
  // }

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
    // this.reservationList.splice(index, 1); // Remove the reservation from the list
    console.log(data,'data');
    this.service.reservationCancel(data._id).subscribe(res=>{
      console.log(res,'res');      
      this.service.updateTableStatus(data.tableNumber, 'blank table').subscribe(res => {
        // this.initialmethod()
      })
    })
  }

}
