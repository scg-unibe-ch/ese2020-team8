import { Component, OnInit } from '@angular/core';
import { ProductsService, IProduct } from '../products.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {UserService} from 'src/app/user/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productId: string;
  product: IProduct;

  constructor(
    private productService: ProductsService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(productId).subscribe((product) => {
      this.product = product;
    });
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
  goToBuy(product: IProduct): void {
    this.router.navigate(['products', product.id, 'buy']);
  }
}
