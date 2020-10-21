import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDescriptionManagerComponent} from './product-description-manager/product-description-manager.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/create',
    component: ProductDescriptionManagerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
