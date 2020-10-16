import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {Router} from '@angular/router';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-product-mgmt-dashboard',
  templateUrl: './product-mgmt-dashboard.component.html',
  styleUrls: ['./product-mgmt-dashboard.component.css']
})
export class ProductMgmtDashboardComponent implements OnInit {
  displayedColumns: string[];
  products: any;


  constructor(
    public userService: UserService,
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

}
