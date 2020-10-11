import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-approve-list',
  templateUrl: './approve-list.component.html',
  styleUrls: ['./approve-list.component.css']
})
export class ApproveListComponent implements OnInit {
  products: any;
  displayedColumns: string[] = ['title', 'description', 'action'];

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
