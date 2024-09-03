import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent  {
  tables = [
    {
      number: 1,
      status: 'Available'
    },
    {
      number: 2,
      status: 'Reserved'
    },
    {
      number: 3,
      status: 'Reserved'
    },
    {
      number: 4,
      status: 'Reserved'
    },
    {
      number: 5,
      status: 'Reserved'
    },
    {
      number: 6,
      status: 'Reserved'
    },
    {
      number: 6,
      status: 'Reserved'
    },
    
  ];
  diningTables: any[] = [];
  showMenu: boolean = false;
  hoveredData: any = null;
  menuStyle: { [key: string]: string } = {};

  constructor(private router: Router, private elRef: ElementRef, private renderer: Renderer2,private service:TableService,private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.getDiningTables().subscribe(data => {
      this.diningTables = data;
      console.log(this.diningTables,'this.diningTables');
    });
  }

  onTableClick(data: any) {
    console.log(data.tableNumber,'data');
    this.router.navigate(['/menus/'+data.tableNumber]);
  }

  onMouseEnter(data: any) {
    this.showMenu = true;
    this.hoveredData = data;
    // setTimeout(() => {
      const tableElement = this.elRef.nativeElement.querySelector('.tableStructured');
      const menuElement = this.elRef.nativeElement.querySelector('.custom-menu');
      const tableRect = tableElement.getBoundingClientRect();
      this.menuStyle = {
        top: `${tableRect.top}px`,
        left: `${tableRect.right + 10}px` // 10px offset from the right edge of the table
      };
    // }, 0);
  }

  onMouseLeave() {
    this.showMenu = false;
    this.hoveredData = null;
  }
}