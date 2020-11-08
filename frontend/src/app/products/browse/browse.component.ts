import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {Router} from '@angular/router';
import {ProductsService, IProduct} from '../products.service';

@Component({
  selector: 'app-product-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  displayedColumns: string[];
  products: IProduct[];

  constructor(
    public userService: UserService,
    public router: Router,
    private productService: ProductsService
  ) {
    this.productService.getAll().subscribe( products => this.products = products);
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
    this.router.navigate(['products', 'buy', { productId: product.id}]);
  }

  goToDetails(product: IProduct): void {
    this.router.navigate(['products', product.id, 'show']);
  }

  goToProductsAdmin(): void {
    this.router.navigate(['admin', 'approve']);
  }

}
