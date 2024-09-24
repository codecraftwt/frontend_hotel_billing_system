import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chair-icon',
  templateUrl: './chair-icon.component.html',
  styleUrls: ['./chair-icon.component.css']
})
export class ChairIconComponent {
  @Input() position: any;
  @Input() table: any;  
  @Input() chair: any;  
}
