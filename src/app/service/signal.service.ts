import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalService {


  notification = signal({
    "noticaCount": 0,
    "id": 0
})


  constructor() { }


}
