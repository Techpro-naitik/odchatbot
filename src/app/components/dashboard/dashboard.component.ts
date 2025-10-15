import { Component, computed, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../reuse-component/header/header.component';
import { SignalService } from '../../service/signal.service';
import { single } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {



  count_number = signal(0)
  count_: any = 0;

  constructor(
    private router: Router,
    private signal: SignalService
  ) {
    effect(() => {
      console.log(this.count_number(),"Hi")
    })
  }

  addCart() {
    this.signal.notification.set(this.count_)
  }

  decreae(id:any) {
    this.count_ = id
    if (this.count_number()>0) {
    this.count_number.set(this.count_number() - 1)

    let obj = {
      noticaCount:  this.count_number(),
      id:id
      
    }
    this.count_ = obj
    console.log(obj)
    this.signal.notification.set(obj)
  }
  }
  increase(id:any) {
    // this.count_ = id
   this.count_number.set(this.count_number() + 1)

    let obj = {
      noticaCount:  this.count_number(),
      id:id
    }
    this.count_ = obj
    console.log(obj)
    // this.count_ = this.count_ + 1
    // this.count_number.set(obj)
    this.signal.notification.set(obj)
  }

}
