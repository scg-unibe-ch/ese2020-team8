import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {Router} from '@angular/router';
import {ProductsService, IProduct} from '../products.service';
import { IProductFilters } from '../pipes/product-filter.pipe';

@Component({
  selector: 'app-product-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  products: IProduct[] = [];
  productFilters: IProductFilters = {};
  searchTerm: string;
  isFavorite = false;

  constructor(
    public userService: UserService,
    public router: Router,
    private productService: ProductsService
  ) {
    this.productService.getAll().subscribe( products => this.products = products );
  }

  ngOnInit(): void {
  }

  goToCreate(): void {
    this.router.navigate(['products', 'create']);
  }

  goToManage(): void {
    this.router.navigate(['products', 'manage']);
  }

  goToBuy(product: IProduct): void {
    this.router.navigate(['products', product.id, 'buy' ]);
  }

  goToDetails(product: IProduct): void {
    this.router.navigate(['products', product.id, 'show']);
  }

  goToProductsAdmin(): void {
    this.router.navigate(['admin', 'approve']);
  }
}

