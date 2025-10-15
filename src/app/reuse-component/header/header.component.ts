import { Component, effect } from '@angular/core';
import { SignalService } from '../../service/signal.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  notification: any;

  constructor(private signalService : SignalService){

    effect(()=>{
      console.log(this.signalService.notification(),"notification Occure")
      this.notification = this.signalService.notification()
    })
  }
}
