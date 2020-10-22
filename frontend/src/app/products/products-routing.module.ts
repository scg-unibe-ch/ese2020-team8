import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductMgmtDashboardComponent} from './product-mgmt-dashboard/product-mgmt-dashboard.component';
import { AuthGuard } from '../auth.guard';
import {ProductEditInfoComponent} from './product-edit-info/product-edit-info.component';
import {ProductEditImagesComponent} from './product-edit-images/product-edit-images.component';

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
  {
    path: 'products/edit-info',
    component: ProductEditInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/edit-images',
    component: ProductEditImagesComponent,
    canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
