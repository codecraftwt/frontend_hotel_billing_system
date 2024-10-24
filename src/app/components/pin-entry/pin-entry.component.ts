import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-pin-entry',
  templateUrl: './pin-entry.component.html',
  styleUrls: ['./pin-entry.component.css']
})
export class PinEntryComponent {
  pin1: string = '';
  pin2: string = '';
  pin3: string = '';
  pin4: string = '';
  errorMessage: string | null = null;

  constructor(private auth: AuthService,private route:Router,private socketService: SocketService,private toastr: ToastrService,private sound:SoundService){}

  focusNext(event: Event, nextInput: HTMLInputElement) {
    const input = event.target as HTMLInputElement | null;
    if (input && input.value) {
      nextInput.focus();
    }
  }

  handleBackspace(event: KeyboardEvent, prevInput: HTMLInputElement) {
    if (event.key === 'Backspace' && event.target instanceof HTMLInputElement) {
      const input = event.target;
      if (!input.value) {
        prevInput.focus();
      }
    }
  }

  isPinComplete(): boolean {
    return this.pin1.length === 1 && this.pin2.length === 1 &&
           this.pin3.length === 1 && this.pin4.length === 1; // Check if all boxes are filled
  }

  onSubmit() {
    this.sound.playSound()
    const pin = this.pin1 + this.pin2 + this.pin3 + this.pin4;
    this.socketService.logIn(pin).subscribe(res=>{
      this.auth.updateRoles(res)
    })
    this.resetPin(); // Reset the PIN after submission
  }

  resetPin() {
    this.pin1 = '';
    this.pin2 = '';
    this.pin3 = '';
    this.pin4 = '';
  }

}
