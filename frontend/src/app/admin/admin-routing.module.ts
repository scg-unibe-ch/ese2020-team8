import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApproveListComponent} from './approve-list/approve-list.component';
import { RoleGuardService } from './role-guard.service';

const routes: Routes = [
  {
    path: 'admin/approve',
    component: ApproveListComponent,
    canActivate: [RoleGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
