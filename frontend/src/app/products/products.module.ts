import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditImagesComponent } from './product-edit-images/product-edit-images.component';
import { MatSelectModule } from '@angular/material/select';
import { ManageComponent } from './manage/manage.component';
import { UpdateComponent } from './update/update.component';
import { ItemComponent } from './item/item.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ManageComponent,
    UpdateComponent,
    ProductEditInfoComponent,
    ProductEditImagesComponent,
    ItemComponent,
  ],
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
    MatButtonToggleModule,
    MatSelectModule,
    MatChipsModule
  ],
  exports: [
    ListComponent
  ]
})
export class ProductsModule {}
