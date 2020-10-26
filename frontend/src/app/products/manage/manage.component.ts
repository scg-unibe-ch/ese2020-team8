import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService, IProduct} from '../products.service';
import {UserService} from 'src/app/user/user.service';

@Component({
  selector: 'app-products-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  displayedColumns  = ['title', 'description', 'action'];
  products: Partial<IProduct>[];

  constructor(
    public userService: UserService,
    public router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.getMyProducts().subscribe( prods => {
      this.products = prods;
    });
  }

  goToCreate() {
    this.router.navigate(['products', 'create']);
  }
}
