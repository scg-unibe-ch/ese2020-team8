import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService, IProduct} from '../products.service';

@Component({
  selector: 'app-products-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  displayedColumns  = ['title', 'description', 'action'];
  products: IProduct[];

  constructor(
    public router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.getMyProducts().subscribe( products => this.products = products);
  }

  goToManage(productId) {
    this.router.navigate(['products', 'manage', { id: productId }]);
  }

  goToCreate() {
    this.router.navigate(['products', 'create']);
  }
}
