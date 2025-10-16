import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environemnt } from '../environment';
import { CONSTANT } from '../utily/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  // loginApi(data: any) {
  //   const url = environemnt.BaseUsrl; // ✅ Fixed typo: 'environemnt' → 'environment'

  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU5NTYyMjk1LCJleHAiOjE3NjA0MjYyOTV9.3lXvz590Xg7l2XwNKhvKDp9yLIabXVUk_hplCTp9nbQ',
  //     'Content-Type': 'application/json'
  //   });
  //   // body: JSON.stringify({ message: 'Hello' })

  //   return this.http.post(url,  JSON.stringify(data), { headers });
  // }



//   async loginApi(data: any): Promise<void> {
//     const url = 'https://odishaioneapidev.utlhq.com/api/stream-chat'; // ✅ use full URL

//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU5NTYyMjk1LCJleHAiOjE3NjA0MjYyOTV9.3lXvz590Xg7l2XwNKhvKDp9yLIabXVUk_hplCTp9nbQ';

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });

//     const reader = response.body!.getReader();
//     const decoder = new TextDecoder();

//     console.log('--- Stream Start ---');

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;
//       const chunk = decoder.decode(value, { stream: true });
//       console.log(chunk); // 👈 Each chunk contains partial messages (SSE style)
//     }

//     console.log('--- Stream End ---');
//   }
// }

// async loginApi(data: any, onChunk: (chunk: string) => void): Promise<void> {
//   const url = 'https://staging-odishaone.com/odisha-one-ai/api/v1/chat/stream';
  
//   // const url =  'http://10.0.0.130:7860/api/v1/run/cc4c0fc3-6905-4e2e-a3f8-a97af5765baf?stream=true'
//   // const token = "GalvvKEGbRELDhPhZqaHKA==:+sigsNTo5qqG21yQBYaQDDjHCcUMSRW7uTGil9Tsm1e+MjEzkwKRNehJMHvtRlKvCQCyIAAoUbuRPU7wt0/euy0uH9CYopyk/CgQxkDReIAjGGwHGbbzCqwQoA29/8xbDXQ4cukSDuQuT2awdZGscNEesq6X5vkaIS1434tN4u2RU2NyKnMVT7aXgW8JQaFd6MWp8riWc6DqaZbfkGsGhHLFfiOmPD0iP+62WRcHXyA=";

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       // 'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   const reader = response.body!.getReader();
//   const decoder = new TextDecoder();

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     const chunk = decoder.decode(value, { stream: true });
//     onChunk(chunk);
//   }
// }


// loginApi(data: any, onChunk: (chunk: string) => void): Promise<void> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch('https://staging-odishaone.com/odisha-one-ai/api/v1/chat/stream', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) {
//         reject(`HTTP error! Status: ${response.status}`);
//         return;
//       }

//       const reader = response.body?.getReader();
//       const decoder = new TextDecoder('utf-8');
//       let done = false;

//       while (!done) {
//         const { value, done: doneReading } = await reader.read();
//         done = doneReading;
//         if (value) {
//           const chunk = decoder.decode(value, { stream: true });
//           onChunk(chunk);
//         }
//       }

//       resolve();
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

async loginApi(data: any, onChunk: (chunk: string) => void): Promise<void> {
  // Replace with your actual API endpoint
  const url = 'https://staging-odishaone.com/odisha-one-ai/api/v1/chat/stream ';

  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       // 'Authorization': `Bearer ${token}`, // uncomment if required
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }










    
  //   // Ensure response body exists
  //   const reader = response.body?.getReader();
  //   if (!reader) {
  //     throw new Error('ReadableStream not supported or empty response body');
  //   }

  //   const decoder = new TextDecoder('utf-8');
  //   let done = false;

  //   // Read the stream chunk by chunk
  //   while (!done) {
  //     const { value, done: doneReading } = await reader.read();
  //     done = doneReading;

  //     if (value) {
  //       const chunk = decoder.decode(value, { stream: true });
  //       onChunk(chunk); // Send each chunk to your callback
  //     }
  //   }

  // } catch (error) {
  //   console.error('Streaming error:', error);
  //   throw error;
  // }


   const response = await fetch(url, {
    method: 'POST',
    headers: {
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    onChunk(chunk);
  }
    
}






// async loginApi(data: any, onChunk: (chunk: string) => void): Promise<void> {
//   const url = 'http://10.0.0.130:7860/api/v1/run/cc4c0fc3-6905-4e2e-a3f8-a97af5765baf?stream=true';

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const reader = response.body!.getReader();
//   const decoder = new TextDecoder();

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;

//     const chunk = decoder.decode(value, { stream: true });
//     onChunk(chunk); // send chunk to your component
//   }
// }


// async loginApi(data: any, onChunk: (chunk: string) => void): Promise<void> {
//     const url = 'https://staging-odishaone.com/odisha-one-ai/api/v1/chat/stream'

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   });

//   const reader = response.body!.getReader();
//   const decoder = new TextDecoder();
//   let buffer = '';

//   while (true) {
//     const { done, value } = await reader.read();  
//     if (done) break;

//     // Decode stream chunk to string
//     buffer += decoder.decode(value, { stream: true });

//     // Split multiple JSONs separated by \n\n
//     const parts = buffer.split('\n\n');
//     buffer = parts.pop() || ''; // keep incomplete JSON part

//     for (const part of parts) {
//       try {
//         console.log(part,"part")
//         const eventObj = JSON.parse(part);
//          console.log(eventObj,"eventObj")
//         // if (eventObj.event === 'token' && eventObj.data?.chunk) {
//         //   onChunk(eventObj.data.chunk);
//         // }
//       } catch (err) {
//         // console.warn('Skipping invalid chunk:', part);
//       }
//     }
//   }
// }


}
