import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductEditImagesComponent } from '../products/product-edit-images/product-edit-images.component';
import { IProduct } from '../products/products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  product: IProduct

  constructor(
    public dialog: MatDialog,
    public router: Router,
    ) {}

    openDialog(  ): void {
      this.dialog.open(OrderComponent, {
        height: '400px',
        width: '600px',
        data: 'test',

      });

      /* dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //this.animal = result;
      });
      dialogRef.close(); */
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  goToBuy(product: IProduct): void {
    this.router.navigate(['products', product.id, 'buy' ]);
  }
}

