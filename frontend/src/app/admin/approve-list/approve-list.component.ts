import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-approve-list',
  templateUrl: './approve-list.component.html',
  styleUrls: ['./approve-list.component.css']
})
export class ApproveListComponent implements OnInit {
  products: {name: string; price: number;}[];
  displayedColumns: string[] = ['name', 'price', 'other'];

  constructor(
    private productService: ProductsService
  ) {
    this.products = this.productService.getProductsWithoutApproval();
  }

  ngOnInit(): void {
  }

  approve(element) {
    console.log(element);
  }

}
