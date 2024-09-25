import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { SoundService } from 'src/app/services/sound.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {

  isModalOpen = false;
  diningTables: any[] = [
    //   {
    //   capacity: 4,
    //   order: null,
    //   status: "blank table",
    //   tableNumber: 1
    // }
  ];
  showMenu: boolean = false;
  hoveredData: any = null;
  menuStyle: { [key: string]: string } = {};
  constructor(private router: Router, private elRef: ElementRef, private renderer: Renderer2, private service: TableService, private socketService: SocketService, private sound: SoundService) {}

  ngOnInit(): void {
    // this.socketService.getDiningTables().subscribe(data => {
    //   this.diningTables = data;
    //   console.log(JSON.stringify(data), 'diningtable');

    //   this.socketService.getAllReservation().subscribe(res => {
    //     console.log(res, 'reservation data===');

    //     // Get the current date in IST
    //     const currentTime = new Date();
    //     const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    //     const currentISTTime = new Date(currentTime.getTime() + istOffset);

    //     // Get today's date in IST without time
    //     const todayStart = new Date(currentISTTime);
    //     todayStart.setHours(0, 0, 0, 0);
    //     const todayEnd = new Date(currentISTTime);
    //     todayEnd.setHours(23, 59, 59, 999);

    //     // Iterate over the dining tables
    //     this.diningTables.forEach(table => {
    //       // Check if the table status is "blank table"
    //       if (table.status === 'blank table') {
    //         // Find matching reservations for this table number
    //         const matchingReservation = res.find(reservation => reservation.tableNumber === table.tableNumber);
    //         if (matchingReservation) {
    //           // Parse the reservation date and time
    //           const reservationDateTime = new Date(matchingReservation.reservationDateTime);
    //           console.log(reservationDateTime, 'reservationDateTime');

    //           const reservationISTTime = new Date(reservationDateTime.getTime() + istOffset);
    //           console.log(reservationISTTime, 'reservationISTTime');

    //           // Subtract one hour from the reservation time
    //           reservationISTTime.setHours(reservationISTTime.getHours() - 1);

    //           // Check if the reservation is today
    //           if (reservationISTTime >= todayStart && reservationISTTime <= todayEnd) {
    //             if (reservationISTTime <= currentISTTime) {
    //               this.socketService.updateTableStatus(matchingReservation.tableNumber, 'reserved table').subscribe(res => {
    //                 // this.initialmethod()
    //               })
    //               console.log(matchingReservation, 'matchingReservation that is due or past');
    //             } else {
    //               console.log(matchingReservation, 'matchingReservation that is upcoming');
    //             }
    //           }
    //         }
    //       }
    //     });
    //   });

    //   console.log(this.diningTables, 'this.diningTables');
    // });

    this.socketService.getDiningTables().subscribe(data => {
      this.diningTables = data;
      console.log(JSON.stringify(data), 'diningtable');

      this.socketService.getAllReservation().subscribe(res => {
        console.log(res, 'reservation data===');

        // Get the current date in IST
        const currentTime = new Date();
        console.log(currentTime, 'currentTime');

        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
        const currentISTTime = new Date(currentTime.getTime());
        console.log(currentISTTime, 'currentISTTime');

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
            const matchingReservation = res.find(reservation => reservation.tableNumber === table.tableNumber);
            if (matchingReservation) {
              // Parse the reservation date and time
              const reservationDateTime = new Date(matchingReservation.reservationDateTime);
              console.log(reservationDateTime, 'reservationDateTime');

              // Assuming reservationDateTime is in UTC, convert to IST
              const reservationISTTime = new Date(reservationDateTime.getTime());

              // Subtract one hour from the reservation time
              reservationISTTime.setHours(reservationISTTime.getHours() - 1);
              console.log(reservationISTTime, 'reservationISTTime');

              // Check if the reservation is today
              if (reservationISTTime >= todayStart && reservationISTTime <= todayEnd) {
                if (reservationISTTime <= currentISTTime) {
                  this.socketService.updateTableStatus(matchingReservation.tableNumber, 'reserved table').subscribe(res => {
                    // this.initialmethod()
                  })
                  console.log(matchingReservation, 'matchingReservation that is due or past');
                } else {
                  console.log(matchingReservation, 'matchingReservation that is upcoming');
                }
              }
            }
          }
        });
      });

      console.log(this.diningTables, 'this.diningTables');
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
  // reserveTable(table: any, event: Event) {
  //   event.stopPropagation(); // Prevent the click event from bubbling up
  //   this.sound.playSound()
  //   console.log(table, 'table');
  //   if (table.status === 'blank table') {
  //     this.socketService.updateTableStatus(table.tableNumber, 'reserved table').subscribe(res => {
  //       // this.initialmethod()
  //     })
  //     // Implement your logic to reserve the table
  //     // Example: this.tableService.updateStatus(table.tableNumber, 'reserved table')
  //     // this.updateTableStatus(table, 'reserved table');
  //   } else {
  //     this.socketService.updateTableStatus(table.tableNumber, 'blank table').subscribe(res => {
  //       // this.initialmethod()
  //     })
  //   }
  // }
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