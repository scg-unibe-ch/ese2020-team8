import { Component, OnInit } from '@angular/core';
import { ProductsService, IProduct } from '../../products/products.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-approve-list',
  templateUrl: './approve-list.component.html',
  styleUrls: ['./approve-list.component.css']
})
export class ApproveListComponent implements OnInit {
  products: any;
  displayedColumns: string[] = ['title', 'description', 'action'];

  constructor(
    private productService: ProductsService,
    private snackBar: MatSnackBar
  ) {
    this.refreshProducts();
  }

  refreshProducts(): void {
    this.productService.getAllPending().subscribe(products => this.products = products);
  }

  ngOnInit(): void {
  }

  approve(element: IProduct) {
    this.productService.approve(element.productId).subscribe(product => {
      this.snackBar.open(`Successfully approved ${product.title}`);
      this.refreshProducts();
    })
  }

}
