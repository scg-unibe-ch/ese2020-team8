import { Component, OnInit } from '@angular/core';
import {ProductsService, IProduct} from '../products.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  products: IProduct[];

  constructor(
    private productService: ProductsService
  )  {
    this.reloadProducts();
  }

  ngOnInit(): void {
  }

  reloadProducts(): void {
    this.productService.getMyProducts().subscribe( prods => this.products = prods);
  }
}
