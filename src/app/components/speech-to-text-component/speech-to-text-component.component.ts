import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-speech-to-text-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './speech-to-text-component.component.html',
  styleUrl: './speech-to-text-component.component.scss'
})
export class SpeechToTextComponentComponent {
  transcript = '';
  isRecording = false;
  recognition:any = null;

  constructor(private zone: NgZone) {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN'; // Change to 'en-US', 'hi-IN', etc.

      this.recognition.onresult = (event:any) => {
        let text = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          text += event.results[i][0].transcript;
        }
        this.zone.run(() => (this.transcript = text));
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.zone.run(() => (this.isRecording = false));
      };

      this.recognition.onend = () => {
        this.zone.run(() => (this.isRecording = false));
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }
  }

  startListening() {
    if (this.recognition && !this.isRecording) {
      this.isRecording = true;
      this.transcript = '';
      this.recognition.start();
    }
  }

  stopListening() {
    if (this.recognition && this.isRecording) {
      this.isRecording = false;
      this.recognition.stop();
    }
  }
}

