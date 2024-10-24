import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { SoundService } from 'src/app/services/sound.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  isModalOpen = false;
  diningTables: any[] = [];
  reservationData: any[] = []
  showMenu: boolean = false;
  hoveredData: any = null;
  menuStyle: { [key: string]: string } = {};
  constructor(private router: Router, private elRef: ElementRef, private renderer: Renderer2, private service: TableService, private socketService: SocketService, private sound: SoundService, private toastr: ToastrService) { }
  private subscription!: Subscription;

  ngOnInit(): void {
    this.socketService.getDiningTables().subscribe(data => {
      this.diningTables = data.sort((a, b) => a.tableNumber - b.tableNumber);;
      this.socketService.getAllReservation().subscribe(res => {
        this.reservationData = res
        this.updateTbaleStatus()
      });
    });
    this.subscription = interval(30000).subscribe(() => {
      if(this.reservationData.length!=0){
        this.updateTbaleStatus()
      }
    });

  }



  updateTbaleStatus() {
    // Get the current date in IST
    const currentTime = new Date();

    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const currentISTTime = new Date(currentTime.getTime());
    // Get today's date in IST without time
    const todayStart = new Date(currentISTTime);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(currentISTTime);
    todayEnd.setHours(23, 59, 59, 999);

    // Iterate over the dining tables
    this.diningTables.forEach(table => {
      // Check if the table status is "blank table"
      if (table.status === 'blank table') {
        // Find matching reservations for this table number
        const matchingReservation = this.reservationData.find(reservation => reservation.tableNumber === table.tableNumber);
        if (matchingReservation) {
          // Parse the reservation date and time
          const reservationDateTime = new Date(matchingReservation.reservationDateTime);
          // Assuming reservationDateTime is in UTC, convert to IST
          const reservationISTTime = new Date(reservationDateTime.getTime());
          // Subtract one hour from the reservation time
          reservationISTTime.setHours(reservationISTTime.getHours() - 1);
          // Check if the reservation is today
          if (reservationISTTime >= todayStart && reservationISTTime <= todayEnd) {
            if (reservationISTTime <= currentISTTime) {
              this.socketService.updateTableStatus(matchingReservation.tableNumber, 'reserved table').subscribe(res => {
                // this.initialmethod()
              })
              const message = `Reservation for ${matchingReservation.reservationName} confirmed! 
                     Table Number: ${matchingReservation.tableNumber}, 
                     Number of People: ${matchingReservation.numberOfPeople}, 
                     Phone: ${matchingReservation.userPhoneNumber}`;

              this.toastr.success(message, 'Reservation upcoming', {
                timeOut: 5000, // Duration in milliseconds
                positionClass: 'toast-top-center' // Position of the toast
              });
            } else {
              console.log('matchingReservation that is upcoming===>', matchingReservation);
            }
          }
        }
      }
    });
  }

  onTableClick(data: any) {
    this.sound.playSound()
    console.log(data.tableNumber, 'data');
    this.router.navigate(['/menus/' + data.tableNumber]);
  }

  hoveredTable: any = null;

  onMouseEnter(table: any) {
    this.hoveredTable = table;
  }

  onMouseLeave() {
    this.hoveredTable = null;
  }

  orderStatus(data: any, status: any) {
    return data.filter((item: any) => item.status === status).length;
  }
  
  onMouseDown(event: MouseEvent, table: any) {
    if (event.ctrlKey && event.button === 0) {
      // Ctrl + Left Click detected
      event.preventDefault(); // Prevent default action to avoid redirection
      event.stopPropagation(); // Stop event from propagating
      this.handleCtrlClick(table);
    }
  }
  handleCtrlClick(table: any) {
    // Handle the Ctrl + Left Click logic here
    console.log('Ctrl + Left Click on table:', table);
    // Implement your logic here
  }



}