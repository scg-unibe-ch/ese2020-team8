import { NgModule } from '@angular/core';
import {TabsComponent} from './tabs/tabs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TabsComponent},
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
