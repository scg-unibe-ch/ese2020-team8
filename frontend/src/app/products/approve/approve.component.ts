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
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(productId).subscribe((product) => {
      this.product = product;
    });
  }


  ngOnInit(): void {
  }

  approve(element: IProduct) {
    this.productService.approve(element.id).subscribe(product => {
      this.snackBar.open(`Successfully approved ${product.title}`);
      this.goBack();
    })
  }

  reject(element: IProduct) {
    this.productService.reject(element.id).subscribe(product => {
      this.snackBar.open(`Product rejected: ${product.title}`);
      this.goBack();
    })
  }

  goBack() {
    this.location.back();
  }

}
