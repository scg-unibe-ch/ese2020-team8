import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {Router} from '@angular/router';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[];
  products: any;

  constructor(
    public userService: UserService,
    public router: Router,
    private productService: ProductsService
  ) {
    this.productService.getAll().subscribe( products => this.products = products);
    if (this.userService.loggedIn) {
      this.displayedColumns  = ['title', 'description', 'action'];
    } else {
      this.displayedColumns  = ['title', 'description'];
    }
  }

  ngOnInit(): void {
  }

  goToCreate(): void {
    this.router.navigate(['products', 'create']);
  }

  goToManage(): void {
    this.router.navigate(['products', 'manage']);
  }

  goToProductsAdmin(): void {
    this.router.navigate(['admin', 'approve']);
  }

}
