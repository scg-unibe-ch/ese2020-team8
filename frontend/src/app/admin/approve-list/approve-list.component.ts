import { Component, OnInit } from '@angular/core';
import { ProductsService, IProduct } from '../../products/products.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.refreshProducts();
  }

  refreshProducts(): void {
    this.productService.getAllPending().subscribe(products => this.products = products);
  }

  ngOnInit(): void {
  }

  goToDetails(element: IProduct): void {
    this.router.navigate(['products', element.id, 'show-approval']);
  }

  approve(element: IProduct) {
    this.productService.approve(element.id).subscribe(product => {
      this.snackBar.open(`Successfully approved ${product.title}`);
      this.refreshProducts();
    })
  }

  reject(element: IProduct) {
    this.productService.reject(element.id).subscribe(product => {
      this.snackBar.open(`Product rejected: ${product.title}`);
      this.refreshProducts();
    })
  }

}
