import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
})
export class CustomModalComponent {
  @Input() title: string = 'Modal Title';
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit(); // Emit the close event
  }
}
