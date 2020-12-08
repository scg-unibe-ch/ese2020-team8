import { Component, OnInit } from '@angular/core';
import {ProductsService, IProduct} from '../products.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  product: IProduct;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {
    const productId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.productService.get(productId).subscribe((product) => {
      this.product = product;
    });
  }


  ngOnInit(): void {
  }

  approve(element: IProduct): void {
    this.productService.approve(element.id).subscribe(product => {
      this.snackBar.open(`Successfully approved ${product.title}`, 'close', {
        duration: 5000
      });
      this.goBack();
    });
  }

  reject(element: IProduct): void {
    this.productService.reject(element.id).subscribe(product => {
      this.snackBar.open(`Product rejected: ${product.title}`, 'close', {
        duration: 5000,
      });
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

}
