import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio('assets/mixkit-modern-click-box-check-11201.wav');
  }
  playSound() {
    this.audio.currentTime = 0; // Reset the audio to the start
    this.audio.play(); // Play the sound
  }
}
