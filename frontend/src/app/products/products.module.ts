import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ProductMgmtDashboardComponent } from './product-mgmt-dashboard/product-mgmt-dashboard.component';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditImagesComponent } from './product-edit-images/product-edit-images.component';


@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent, ProductMgmtDashboardComponent, ProductEditInfoComponent, ProductEditImagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonToggleModule
  ]
})
export class ProductsModule { }
