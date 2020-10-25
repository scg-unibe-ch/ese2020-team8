import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService, IProduct} from '../products.service';
import {UserService} from 'src/app/user/user.service';
import { products } from './products';

@Component({
  selector: 'app-products-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  displayedColumns  = ['title', 'description', 'action'];
  products2: IProduct[];
  products: any[] = products;

  constructor(
    public userService: UserService,
    public router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.getMyProducts().subscribe( products => this.products2 = products);
  }

  goToCreate() {
    this.router.navigate(['products', 'create']);
  }
}
