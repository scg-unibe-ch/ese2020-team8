import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApproveListComponent} from './approve-list/approve-list.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  {
    path: 'admin/approve',
    component: ApproveListComponent,
    canActivate: [RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
