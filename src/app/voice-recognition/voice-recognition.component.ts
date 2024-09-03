import { Component } from '@angular/core';

@Component({
  selector: 'app-voice-recognition',
  templateUrl: './voice-recognition.component.html',
  styleUrls: ['./voice-recognition.component.css']
})
export class VoiceRecognitionComponent {
  results: any[] = [];
  isListening = false;
  recognition: any;

  constructor() {
    // Check for browser compatibility
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event: any) => {
        console.log(event.results,'event.results');
        
        const transcript = event.results[0][0].transcript;
        this.processText(transcript);
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error detected: ' + event.error);
      };
    } else {
      console.error('Speech recognition not supported');
    }
  }

  startListening() {
    if (this.recognition) {
      this.isListening = true;
      this.recognition.start();
    }
  }

  stopListening() {
    if (this.recognition) {
      this.isListening = false;
      this.recognition.stop();
    }
  }

  processText(text: string) {
    // Example: "Pav Bhaji Ek"
    const words = text.split(' ');
    if (words.length >= 2) {
      const quantity = this.getQuantity(words[words.length - 1]);
      const name = words.slice(0, -1).join(' ');
      this.results = [{
        name: name.toLowerCase(),
        quantity: quantity
      }];
    } else {
      console.error('Input format is incorrect');
    }
  }

  getQuantity(word: string): number {
    // Convert common words for numbers to digits
    const quantityMap: { [key: string]: number } = {
      'ek': 1,
      'do': 2,
      'teen': 3,
      'char': 4,
      'paanch': 5
      // Add more mappings as needed
    };
    return quantityMap[word.toLowerCase()] || parseInt(word, 10) || 1; // Default to 1 if not found
  }
}
