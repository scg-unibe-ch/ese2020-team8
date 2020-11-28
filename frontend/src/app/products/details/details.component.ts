import { Component, OnInit } from '@angular/core';
import { ProductsService, IProduct } from '../products.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {UserService} from 'src/app/user/user.service';
import {QuestionsService} from '../questions.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productId: string;
  product: IProduct;
  questions: any;

  isOwnProduct: boolean;

  constructor(
    private productService: ProductsService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private questionService: QuestionsService,
  ) {
    const productId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.productService.get(productId).subscribe((product) => {
      this.product = product;
      this.isOwnProduct = this.userService.user.userId === product.id;
    });
    this.questionService.getQuestionsPerProduct(productId).subscribe( questions => {
      this.questions = questions;
    });
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
  goToBuy(): void {
    this.router.navigate(['products', this.product.id, 'buy']);
  }

  goToQuestion(): void {
    this.router.navigate(['products', this.product.id, 'question-form']);
  }

}
