import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductEditImagesComponent } from './product-edit-images/product-edit-images.component';
import { BrowseComponent } from './browse/browse.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../auth.guard';
import { ManageComponent } from './manage/manage.component';
import { UpdateComponent } from './update/update.component';
import { HistoryComponent } from './history/history.component';
import { NotificationsComponent } from './notifications/notifications.component';

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
    path: 'products/notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
