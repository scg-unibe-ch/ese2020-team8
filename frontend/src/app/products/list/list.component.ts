import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {Router} from '@angular/router';
import {ProductsService, IProduct} from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
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

  goToProductsAdmin(): void {
    this.router.navigate(['admin', 'approve']);
  }

}
