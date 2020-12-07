import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IProduct } from '../products.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  product: IProduct;
  totalPrice: number;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.totalPrice = this.data.rentalDays
      ? this.data.rentalDays * this.data.product.price
      : this.data.product.price;
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  goToBuy(product: IProduct): void {
    this.router.navigate(['products', product.id, 'buy']);
  }
}
