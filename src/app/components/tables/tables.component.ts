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
  constructor(private router: Router, private elRef: ElementRef, private renderer: Renderer2, private service: TableService, private socketService: SocketService, private sound: SoundService) {
    // this.audio = new Audio('assets/clicking-interface-select-201946.mp3');
    // this.audio = new Audio('assets/minimal-pop-click-ui-1-198301.mp3');

  }

  ngOnInit(): void {
    this.socketService.getDiningTables().subscribe(data => {
      this.diningTables = data;
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
    console.log(table, 'table');

    this.hoveredTable = table;
  }

  onMouseLeave() {
    this.hoveredTable = null;
  }

  orderStatus(data: any, status: any) {
    return data.filter((item: any) => item.status === status).length;
  }
  reserveTable(table: any, event: Event) {
    event.stopPropagation(); // Prevent the click event from bubbling up
    this.sound.playSound()
    if (table.status === 'blank table') {
      console.log(table, 'table');
      this.socketService.updateTableStatus(table.tableNumber, 'reserved table').subscribe(res => {
        // this.initialmethod()
      })
      // Implement your logic to reserve the table
      // Example: this.tableService.updateStatus(table.tableNumber, 'reserved table')
      // this.updateTableStatus(table, 'reserved table');
    } else {
      this.socketService.updateTableStatus(table.tableNumber, 'blank table').subscribe(res => {
        // this.initialmethod()
      })
    }
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