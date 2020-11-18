import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductEditImagesComponent } from './product-edit-images/product-edit-images.component';
import { BrowseComponent } from './browse/browse.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../auth.guard';
import { ManageComponent } from './manage/manage.component';
import { UpdateComponent } from './update/update.component';
import { BuyComponent } from './buy/buy.component';
import { PayComponent } from './pay/pay.component';
import { HistoryComponent } from './history/history.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

const routes: Routes = [
  {
    path: 'products',
    component: BrowseComponent,
  },
  {
    path: 'products/history',
    component: HistoryComponent,
  },
  {
    path: 'products/:id/show',
    component: ShowDetailsComponent,
  },
  {
    path: 'products/create',
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:id/update',
    component: UpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/manage',
    component: ManageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/edit-images',
    component: ProductEditImagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:id/buy',
    component: BuyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/pay',
    component: PayComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
