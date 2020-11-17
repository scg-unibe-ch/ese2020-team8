import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { ProductsRoutingModule } from './products-routing.module';
import { BrowseComponent } from './browse/browse.component';
import { CreateComponent } from './create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProductEditImagesComponent } from './product-edit-images/product-edit-images.component';
import { MatSelectModule } from '@angular/material/select';
import { ManageComponent } from './manage/manage.component';
import { UpdateComponent } from './update/update.component';
import { ItemComponent } from './item/item.component';
import { DeleteComponent } from './delete/delete.component';
import { HistoryComponent } from './history/history.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { BuyComponent } from './buy/buy.component';
import { PayComponent } from './pay/pay.component';
import {FilterComponent} from './filter/filter.component';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    BrowseComponent,
    CreateComponent,
    ManageComponent,
    UpdateComponent,
    ProductEditImagesComponent,
    ItemComponent,
    DeleteComponent,
    HistoryComponent,
    UploadImageComponent,
    BuyComponent,
    PayComponent,
    FilterComponent,
    ProductFilterPipe,
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
    MatChipsModule,
    MatDialogModule,
    MatStepperModule,
    Ng2SearchPipeModule,
    MatBadgeModule
  ],
  exports: [
    BrowseComponent
  ],
  providers: [
    ProductFilterPipe
  ]
})
export class ProductsModule {}
