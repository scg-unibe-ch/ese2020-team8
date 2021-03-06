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
import { QuestionFormComponent } from './question/question-form/question-form.component';
import { DetailsComponent } from './details/details.component';
import {RoleGuard} from '../admin/role.guard';
import {ApproveComponent} from './approve/approve.component';
import { FavoritesComponent } from './favorites/favorites.component';

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
    component: DetailsComponent,
  },
  {
    path: 'products/:id/show-approval',
    component: ApproveComponent,
    canActivate: [RoleGuard]
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
  {
    path: 'products/favorites',
    canActivate: [AuthGuard],
    component: FavoritesComponent,
  },
  {
    path: 'products/:id/question-form',
    component: QuestionFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
