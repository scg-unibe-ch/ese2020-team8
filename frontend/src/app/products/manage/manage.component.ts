import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, IProduct } from '../products.service';
import { UserService } from 'src/app/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { ReturnComponent } from '../return/return.component';

@Component({
  selector: 'app-products-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  displayedColumns = ['title', 'description', 'action'];
  products: Partial<IProduct>[];
  filteredProducts: Partial<IProduct>[];

  constructor(
    public userService: UserService,
    public router: Router,
    private productService: ProductsService,
    public dialog: MatDialog,
  ) {
    this.reloadProducts();
  }

  ngOnInit(): void {}

  goToCreate(): void {
    this.router.navigate(['products', 'create']);
  }

  goToEdit(product: IProduct): void {
    this.router.navigate(['products', product.id, 'update']);
  }

  delete(product: IProduct): void {
    this.dialog
      .open(DeleteComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.productService
            .delete(product)
            .subscribe(() => this.reloadProducts());
        }
      });
  }

  disable(product: IProduct): void {
    this.productService.disable(product.id).subscribe(() => this.reloadProducts());
  }

  enable(product: IProduct): void {
    this.productService.enable(product.id).subscribe(() => this.reloadProducts());
  }

  return(product: IProduct): void {
    this.dialog
      .open(ReturnComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.productService
            .return(product.id)
            .subscribe(() => {
              this.reloadProducts();
              window.location.reload();
            })}
      });
  }


  reloadProducts(): void {
    this.productService.getMyProducts().subscribe((prods) => {
      this.products = prods;
      this.filteredProducts = prods;
    });
  }

  filterActiveProducts(status: string): void {
    if (status === 'active') {
      this.filteredProducts = this.products.filter((product) =>
        ['approved', 'pending'].includes(product.status)
      );
    } else {
      this.filteredProducts = [];
    }
  }

  filterSoldProducts(status: string): void {
    if (status === 'sold') {
      this.filteredProducts = this.products.filter((product) =>
        ['sold'].includes(product.status)
      );
    } else {
      this.filteredProducts = [];
    }
  }

  filterLentProducts(status: string): void {
    if (status === 'rent') {
      this.filteredProducts = this.products.filter((product) =>
        ['rent', 'returned'].includes(product.status)
      );
    } else {
      this.filteredProducts = [];
    }
  }
}
