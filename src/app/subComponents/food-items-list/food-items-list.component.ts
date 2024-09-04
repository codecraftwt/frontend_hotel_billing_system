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

  getBorderColor(type: string): string {
    switch(type) {
      case 'Vegetarian':
        return '8px solid #48eb48';
      case 'Non-Vegetarian':
        return '8px solid #ff2f2f';
      case 'Soups':
        return '8px solid orange';
      default:
        return '8px solid black';
    }
  }

}
