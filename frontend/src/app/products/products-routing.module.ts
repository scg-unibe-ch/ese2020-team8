import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import { AuthGuard } from '../auth.guard';
import {ManageComponent} from './manage/manage.component';
import {UpdateComponent} from './update/update.component';

const routes: Routes = [
  {
    path: 'products',
    component: ListComponent,
  },
  {
    path: 'products/create',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/:id/update',
    component: UpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/manage',
    component: ManageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
