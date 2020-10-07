import { NgModule } from '@angular/core';
import {TabsComponent} from './tabs/tabs.component';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import {TodoListComponent} from './todo-list/todo-list.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'todolist', component: TodoListComponent},
  { path: '**', component: TabsComponent},
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
