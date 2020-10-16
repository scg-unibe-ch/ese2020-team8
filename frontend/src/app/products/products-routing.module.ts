import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductMgmtDashboardComponent} from './product-mgmt-dashboard/product-mgmt-dashboard.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'product-mgmt-dashboard', 
  component: ProductMgmtDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
