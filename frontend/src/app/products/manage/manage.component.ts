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
  ) {
    this.reloadProducts();
  }

  ngOnInit(): void {
  }

  goToCreate(): void {
    this.router.navigate(['products', 'create']);
  }

  goToEdit(product: IProduct): void {
    this.router.navigate(['products', product.id, 'update']);
  }

  delete(product: IProduct): void {
    this.productService.delete(product).subscribe( () => this.reloadProducts());
  }

  reloadProducts(): void {
    this.productService.getMyProducts().subscribe( prods => this.products = prods);
  }
}
