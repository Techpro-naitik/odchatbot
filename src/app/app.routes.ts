import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { PracticeComponent } from './components/practice/practice.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpeechToTextComponentComponent } from './components/speech-to-text-component/speech-to-text-component.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,

    },
    { path: 'Home', component: HomeComponent },
    { path: 'Signup', component: SignupComponent },
    {
        path: 'practice-Component',
        loadComponent: (() => import('./components/practice/practice.component').then((m) => m.PracticeComponent))
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        // loadComponent: (() => import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent))
    },
    {
        path:"Text-speech",
        component: SpeechToTextComponentComponent,
        // loadComponent:(()=> import('./components/speech-to-text-component/speech-to-text-component.component').then((m)=>m.SpeechToTextComponentComponent))
    },
    { path: "**", redirectTo: "", pathMatch: "full" }
];
