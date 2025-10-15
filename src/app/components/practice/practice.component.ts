import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { single } from 'rxjs';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss'
})
export class PracticeComponent implements OnInit {


  // count = 0;
  count = signal(0)
  color = signal(["Red", "Black"])


  length = signal(20);
  breath = signal(40);
  area = computed(() => this.length() * this.breath())


  // a = 30 ;
  // b = 50;
  // c = this.a + this.b


  a = signal(30);
  b = signal(50);

  c = computed(() => this.a() + this.b())



  normalForms!: FormGroup
  constructor(
    private fb: FormBuilder,
    private router : Router
  ) {

    // effect(()=>{
    //   console.log('effect due to count signal is triggerd' ,this.count())
    // })
    // effect(()=>{
    //   console.log('effect due to color signal is triggerd' ,this.color())
    // })

  }

  ngOnInit(): void {



    console.log(this.a());
    // this.a = 50;
    this.a.set(50);
    console.log(this.a());

    // console.log(this.count())
    // console.log(this.color())

    // this.normalForms = this.fb.group({
    //   username: new FormControl('', {
    //     nonNullable: true,
    //     validators: [Validators.required]
    //   }),
    //   password: new FormControl('', {
    //     nonNullable: true,
    //     validators: [Validators.required]
    //   })
    // })
  }


  getTypeOFunction(value: number) {
    switch (value) {
      case 1:

        break;
    }
  }


  increase() {
    
    // this.count++;
    this.count.set(this.count() + 1)  
    this.color.update((value)=> [...value,"blue"])
    this.length.set(30)

  }
  decreae() {
    this.count.set(this.count() - 1)
    // this.count--;
  }

  movetoRouter(){
    this.router.navigate(['/dashboard'])
  }

}
