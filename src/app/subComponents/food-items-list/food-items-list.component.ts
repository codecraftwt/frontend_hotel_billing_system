import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-food-items-list',
  templateUrl: './food-items-list.component.html',
  styleUrls: ['./food-items-list.component.css']
})
export class FoodItemsListComponent implements OnInit {
  @Input() data: any;
  @Output() itemClick = new EventEmitter<any>();

  onClick() {
    this.itemClick.emit(this.data);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
