import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {Router} from '@angular/router';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // products = [
  //   {position: 1, name: 'Product 1', weight: 1.0079, symbol: 'p1'},
  //   {position: 2, name: 'Product 2', weight: 4.0026, symbol: 'p2'},
  //   {position: 3, name: 'Product 3', weight: 6.941, symbol: 'p3'},
  //   {position: 4, name: 'Product 4', weight: 9.0122, symbol: 'p4'},
  //   {position: 5, name: 'Product 5', weight: 10.811, symbol: 'p5'},
  // ];
  displayedColumns: string[];
  products: any;

  constructor(
    public userService: UserService,
    public router: Router,
    private productService: ProductsService
  ) {
    this.products = this.productService.getProductsWithoutApproval();
    if (this.userService.loggedIn) {
      this.displayedColumns  = ['name', 'price', 'action'];
    } else {
      this.displayedColumns  = ['name', 'price'];
    }
  }

  ngOnInit(): void {
  }

  goToCreate(): void {
    this.router.navigate(['products', 'create']);
  }

  goToProductsAdmin(): void {
    this.router.navigate(['admin', 'approve']);
  }

}
