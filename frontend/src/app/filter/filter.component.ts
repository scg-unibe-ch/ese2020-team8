import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {Router} from '@angular/router';
import {ProductsService, IProduct} from '../products/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{

  title = 'Product Search / Filter';
  searchText = '';
  product = [
    { title: 'Babywagen', location: 'Luzern', price: '200.-' },
  ];
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
}