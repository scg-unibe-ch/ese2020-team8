import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../products.service';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../products.service';
import { IQuestion, QuestionsService } from '../questions.service';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';





@Component({
  selector: 'app-product-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  pageType: string;
  productId: string;
  panelOpenState = false;
  questions: IQuestion[] = [];


  @Input() product: IProduct;
  photos: {imageSource: string; }[];
  slides: {image: string; }[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private location: Location,
    public userService: UserService,
    private questionService: QuestionsService,
  ) {  }


  ngOnInit(): void {
      const productId = this.route.snapshot.paramMap.get('id');
      this.questionService.getQuestionsPerProduct(productId).subscribe( questions => {
        this.questions = questions
      } );
      this.photos = this.product.Photos.map((photo) => {
        const newPhoto = {
          imageSource: `${environment.endpointURL}/images/${photo.fileName}`,
        };
        return newPhoto;
      });
      this.slides = this.photos.map((photo) => ({ image: photo.imageSource }));
  }

  showAvailability(): boolean {
    return this.product.productType === 'service' ||
    this.product.productType === 'good' &&
    this.product.purchaseType  === 'rent';
  }

  goToQuestion(product: IProduct): void {
    this.router.navigate(['products', product.id, 'question-form']);
  }

  goBack() {
    this.location.back();
  }

}
