import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import {NotificationComponent} from './notification/notification.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  {
    path: 'notifications',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: WelcomeComponent},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
