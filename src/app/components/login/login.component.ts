import { NonNullAssert } from '@angular/compiler';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownPipe } from '../../pipe/markdown.pipe';


interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  time: Date; // Add this
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownPipe
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

  quickPayItems = ['1.1 Services', '1.2 Check Transactions'];
  keyProgramItems = [
    '2.1 Subhadra Yojana',
    '2.2 Ama Seba Kendra',
    '2.3 State Dashboard',
    '2.4 Gopabandhu Jana Arogya Yojana',
    '2.5 Jana Sunani'
  ];
  citizenItems = ['3.1 Informational Services'];
  activeAccordion: string | null | any;

  isLoading: boolean = false;

  toggleAccordion(name: string) {
    this.activeAccordion = this.activeAccordion === name ? null : name;
  }



  loginForm!: FormGroup;
  messages: ChatMessage[] = [];   // stores all chat messages
  // isLoading = false;
  isChatOpen: any;
  isTyping: boolean | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });
  }


  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  private scrollToBottom(): void {
    try {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight; // always scroll to bottom
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  async submitData(ev?: any) {
    this.isLoading = true; 
    console.log(ev, "2")
    if (ev) {
      this.loginForm.controls['userId'].setValue(ev)
    }
    this.scrollToBottom();
    const userInput = this.loginForm.value.userId?.trim();
    if (!userInput) return;

    this.isLoading = true;
    this.isTyping = true;

    // Push user message to chat
    this.scrollToBottom();
    this.messages.push({ sender: 'user', text: userInput, time: new Date() });

    // Prepare data (no need to wrap in `{ input: data }`)
    const data = {
      input_value: userInput,
      output_type: 'chat',
      input_type: 'chat',
      stream: 'true',
      time: new Date()
    };
    this.loginForm.reset();
    // Temporary variable to build bot response
    let botResponse = '';

    try {
      await this.authService.loginApi(data, (chunk: string) => {
        // Append streamed chunk

        botResponse += chunk;
        this.scrollToBottom();
        const lastMsg: any = this.messages[this.messages.length - 1];
        if (!lastMsg || lastMsg.sender !== 'bot') {
          lastMsg.time = new Date(); // u
          this.messages.push({ sender: 'bot', text: botResponse, time: new Date() });
        } else {
          lastMsg.text = botResponse;
        }

        // Trigger UI update
        this.cdr.detectChanges();
      });
    } catch (err) {
      console.error('Stream error:', err);
      this.messages.push({
        sender: 'bot',
        text: '⚠️ Sorry, there was a problem processing your message.',
        time: new Date()
      });
    } finally {
      this.isTyping = false;
      this.isLoading = false;
      this.isLoading = false;
      

    }
    this.scrollToBottom();
  }



}
