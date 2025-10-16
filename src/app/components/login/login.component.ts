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

  // async submitData(ev?: any) {
  //   this.isLoading = true; 
  //   console.log(ev, "2")
  //   if (ev) {
  //     this.loginForm.controls['userId'].setValue(ev)
  //   }
  //   this.scrollToBottom();
  //   const userInput = this.loginForm.value.userId?.trim();
  //   if (!userInput) return;

  //   this.isLoading = true;
  //   this.isTyping = true;

  //   // Push user message to chat
  //   this.scrollToBottom();
  //   this.messages.push({ sender: 'user', text: userInput, time: new Date() });

  //   // Prepare data (no need to wrap in `{ input: data }`)
  //   const data = {
  //     input_value: userInput,
  //     output_type: 'chat',
  //     input_type: 'chat',
  //     stream: 'true',
  //     time: new Date()
  //   };
  //   this.loginForm.reset();
  //   // Temporary variable to build bot response
  //   let botResponse = '';

  //   try {
  //     await this.authService.loginApi(data, (chunk: string) => {
  //       // Append streamed chunk
  //       console.log(botResponse,"botResponse")
  //       botResponse += chunk;
  //       this.scrollToBottom();
  //       const lastMsg: any = this.messages[this.messages.length - 1];
  //       if (!lastMsg || lastMsg.sender !== 'bot') {
  //         lastMsg.time = new Date(); // u
  //         this.messages.push({ sender: 'bot', text: botResponse?['data'].['text'], time: new Date() });
  //       } else {
  //         lastMsg.text = botResponse;
  //       }

  //       // Trigger UI update
  //       this.cdr.detectChanges();
  //     });
  //   } catch (err) {
  //     console.error('Stream error:', err);
  //     this.messages.push({
  //       sender: 'bot',
  //       text: '⚠️ Sorry, there was a problem processing your message.',
  //       time: new Date()
  //     });
  //   } finally {
  //     this.isTyping = false;
  //     this.isLoading = false;
  //     this.isLoading = false;
      

  //   }
  //   this.scrollToBottom();
  // }



//   async submitData(ev?: any) {
//   this.isLoading = true;
//   console.log(ev, "2");

//   if (ev) {
//     this.loginForm.controls['userId'].setValue(ev);
//   }

//   this.scrollToBottom();
//   const userInput = this.loginForm.value.userId?.trim();
//   if (!userInput) return;

//   this.isLoading = true;
//   this.isTyping = true;

//   // Push user message to chat
//   this.messages.push({ sender: 'user', text: userInput, time: new Date() });

//   // Prepare request payload
//   const data = {
//     input_value: userInput,
//     output_type: 'chat',
//     input_type: 'chat',
//     stream: 'true',
//     time: new Date()
//   };

//   this.loginForm.reset();
//   let buffer = ''; // For partial JSON chunks

//   try {
//     // Call streaming API
//     await this.authService.loginApi(data, (chunk: string) => {
//       buffer += chunk;
//       let boundary;
//       while ((boundary = buffer.indexOf('\n')) >= 0) {
//         const jsonLine = buffer.slice(0, boundary).trim();
//         buffer = buffer.slice(boundary + 1);

//         if (!jsonLine) continue;
//         try {
//           const parsed = JSON.parse(jsonLine);
//           const botText = parsed?.text || '';
//           if (!botText) continue;

//           // Check last message
//           const lastMsg = this.messages[this.messages.length - 1];
//           if (!lastMsg || lastMsg.sender !== 'bot') {
//             this.messages.push({ sender: 'bot', text: botText, time: new Date() });
//           } else {
//             lastMsg.text += botText;
//           }

//           this.scrollToBottom();
//           this.cdr.detectChanges();
//         } catch (err) {
//           console.warn('Invalid JSON chunk:', jsonLine);
//         }
//       }
//     });
//   } catch (err) {
//     console.error('Stream error:', err);
//     this.messages.push({
//       sender: 'bot',
//       text: '⚠️ Sorry, there was a problem processing your message.',
//       time: new Date()
//     });
//   } finally {
//     this.isTyping = false;
//     this.isLoading = false;
//   }

//   this.scrollToBottom();
// }


// async submitData(ev?: any) {
//   this.isLoading = true;

//   if (ev) {
//     this.loginForm.controls['userId'].setValue(ev);
//   }

//   const userInput = this.loginForm.value.userId?.trim();
//   if (!userInput) return;

//   this.isTyping = true;
//   this.messages.push({ sender: 'user', text: userInput, time: new Date() });

//   const data = {
//     input_value: userInput,
//     output_type: 'chat',
//     input_type: 'chat',
//     stream: 'true',
//     time: new Date()
//   };

//   this.loginForm.reset();
//   let buffer = '';

//   try {
//     await this.authService.loginApi(data, (chunk: string) => {
//       buffer += chunk;

//       // Split by double newlines (SSE event separator)
//       const parts = buffer.split(/\n\n/);
//       buffer = parts.pop() || '';

//       for (const part of parts) {
//         // Remove "data:" or "event:" prefixes
//         const cleaned = part
//           .split('\n')
//           .map(line => line.replace(/^data:\s?/, '').replace(/^event:\s?/, '').trim())
//           .filter(Boolean)
//           .join('');

//         if (!cleaned) continue;

//         try {
//           const parsed = JSON.parse(cleaned);
//           const botText = parsed?.text || '';
//           if (!botText) continue;

//           const lastMsg = this.messages[this.messages.length - 1];
//           if (!lastMsg || lastMsg.sender !== 'bot') {
//             this.messages.push({ sender: 'bot', text: botText, time: new Date() });
//           } else {
//             lastMsg.text += botText;
//           }

//           this.scrollToBottom();
//           this.cdr.detectChanges();
//         } catch (err) {
//           console.warn('Skipped non-JSON SSE part:', cleaned);
//         }
//       }
//     });
//   } catch (err) {
//     console.error('Stream error:', err);
//     this.messages.push({
//       sender: 'bot',
//       text: '⚠️ Sorry, there was a problem processing your message.',
//       time: new Date()
//     });
//   } finally {
//     this.isTyping = false;
//     this.isLoading = false;
//   }

//   this.scrollToBottom();
// }



// async submitData(ev?: any) {
//   this.isLoading = true;

//   if (ev) {
//     this.loginForm.controls['userId'].setValue(ev);
//   }

//   const userInput = this.loginForm.value.userId?.trim();
//   if (!userInput) return;

//   this.isTyping = true;
//   this.messages.push({ sender: 'user', text: userInput, time: new Date() });

//   const data = {
//     input_value: userInput,
//     output_type: 'chat',
//     input_type: 'chat',
//     stream: 'true',
//     time: new Date()
//   };

//   this.loginForm.reset();
//   let buffer = '';

//   try {
//     await this.authService.loginApi(data, (chunk: string) => {
//       buffer += chunk;

//       // Break on each event/message chunk
//       const events = buffer.split(/\n(?=data:|event:|message)/);
//       buffer = events.pop() || ''; // keep leftover partial data

//       for (const raw of events) {
//         const cleaned = raw
//           .replace(/^data:\s?/, '')
//           .replace(/^event:\s?/, '')
//           .replace(/^message\s?/, '')
//           .trim();

//         if (!cleaned) continue;

//         try {
//           const parsed = JSON.parse(cleaned);
//           const botText = parsed?.text || '';
//           if (!botText) continue;

//           const lastMsg = this.messages[this.messages.length - 1];
//           if (!lastMsg || lastMsg.sender !== 'bot') {
//             this.messages.push({ sender: 'bot', text: botText, time: new Date() });
//           } else {
//             lastMsg.text += botText;
//           }

//           this.scrollToBottom();
//           this.cdr.detectChanges();
//         } catch (err) {
//           console.warn('Skipped non-JSON SSE part:', cleaned);
//         }
//       }
//     });
//   } catch (err) {
//     console.error('Stream error:', err);
//     this.messages.push({
//       sender: 'bot',
//       text: '⚠️ Sorry, there was a problem processing your message.',
//       time: new Date()
//     });
//   } finally {
//     this.isTyping = false;
//     this.isLoading = false;
//   }

//   this.scrollToBottom();
// }

// async submitData(ev?: any) {
//   this.isLoading = true;

//   if (ev) {
//     this.loginForm.controls['userId'].setValue(ev);
//   }

//   const userInput = this.loginForm.value.userId?.trim();
//   if (!userInput) {
//     this.isLoading = false;
//     return;
//   }

//   this.isTyping = true;
//   this.messages.push({ sender: 'user', text: userInput, time: new Date() });

//   const data = {
//     input_value: userInput,
//     output_type: 'chat',
//     input_type: 'chat',
//     stream: 'true',
//     time: new Date()
//   };

//   // Only reset userId so other form controls remain intact
//   this.loginForm.controls['userId'].reset();
  
//   let buffer = '';

//   try {
//     await this.authService.loginApi(data, (chunk: string) => {
//       buffer += chunk;

//       // Split buffer by SSE events (data:, event:, message:)
//       const events = buffer.split(/\n(?=data:|event:|message)/);
//       buffer = events.pop() || ''; // keep leftover partial data

//       for (const raw of events) {
//         const cleaned = raw
//           .replace(/^(data:|event:|message)\s?/, '')
//           .trim();

//         if (!cleaned) continue;

//         try {
//           const parsed = JSON.parse(cleaned);
//           const botText = parsed?.text || '';
//           if (!botText) continue;

//           const lastMsg = this.messages[this.messages.length - 1];

//           if (!lastMsg || lastMsg.sender !== 'bot') {
//             this.messages.push({ sender: 'bot', text: botText, time: new Date() });
//           } else {
//             lastMsg.text += botText; // append partial bot response
//             lastMsg.time = new Date(); // update timestamp
//           }

//           this.scrollToBottom();
//           this.cdr.detectChanges();
//         } catch (err) {
//           console.warn('Skipped non-JSON SSE part:', cleaned);
//         }
//       }
//     });
//   } catch (err) {
//     console.error('Stream error:', err);
//     this.messages.push({
//       sender: 'bot',
//       text: '⚠️ Sorry, there was a problem processing your message.',
//       time: new Date()
//     });
//   } finally {
//     this.isTyping = false;
//     this.isLoading = false;
//     this.scrollToBottom();
//   }
// }



async submitData(ev?: any) {
  this.isLoading = true;

  if (ev) {
    this.loginForm.controls['userId'].setValue(ev);
  }

  const userInput = this.loginForm.value.userId?.trim();
  if (!userInput) {
    this.isLoading = false;
    return;
  }

  this.isTyping = true;
  this.messages.push({ sender: 'user', text: userInput, time: new Date() });

  const data = {
    input_value: userInput,
    output_type: 'chat',
    input_type: 'chat',
    stream: 'true',
    time: new Date()
  };

  this.loginForm.controls['userId'].reset();

  let buffer = '';
  let lastBotText = ''; // Track the last bot text to avoid repeats

  try {
    await this.authService.loginApi(data, (chunk: string) => {
      buffer += chunk;

      const events = buffer.split(/\n(?=data:|event:|message)/);
      buffer = events.pop() || '';

      for (const raw of events) {
        const cleaned = raw.replace(/^(data:|event:|message)\s?/, '').trim();
        if (!cleaned) continue;

        try {
          const parsed = JSON.parse(cleaned);
          const botText = parsed?.text || '';
          if (!botText) continue;

          // Compute only the new part of text
          const newText = botText.startsWith(lastBotText)
            ? botText.slice(lastBotText.length)
            : botText;

          if (newText) {
            const lastMsg = this.messages[this.messages.length - 1];
            if (!lastMsg || lastMsg.sender !== 'bot') {
              this.messages.push({ sender: 'bot', text: newText, time: new Date() });
            } else {
              lastMsg.text += newText;
              lastMsg.time = new Date();
            }
          }

          lastBotText = botText; // Update lastBotText
          this.scrollToBottom();
          this.cdr.detectChanges();
        } catch (err) {
          console.warn('Skipped non-JSON SSE part:', cleaned);
        }
      }
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
    this.scrollToBottom();
  }
}



}
