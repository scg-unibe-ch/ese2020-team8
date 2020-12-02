import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import {NotificationComponent} from './notification/notification.component';
import {AuthGuard} from './auth.guard';
import { AnswerFormComponent } from './products/question/answer-form/answer-form.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  {
    path: 'notifications',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'questions/:id/answer-form',
    component: AnswerFormComponent,
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
