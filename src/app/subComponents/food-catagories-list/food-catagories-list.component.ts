import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-food-catagories-list',
  templateUrl: './food-catagories-list.component.html',
  styleUrls: ['./food-catagories-list.component.css']
})
export class FoodCatagoriesListComponent implements OnInit {
  @Input()active!:boolean;
  @Input() data: any;
  @Output() itemClick = new EventEmitter<any>();
  @Input() key: number=-1; 
  onClick() {
    this.itemClick.emit(this.data);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
