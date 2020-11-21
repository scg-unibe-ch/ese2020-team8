import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IProduct } from '../products.service';
import { ProductsService } from '../products.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  productId: string;
  photos: { imageSource: string }[];
  slides: { image: string }[]; //Array of images
  pageType: string;

  @Input() product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    const pageType =  this.router.url.split('/').pop();
    this.pageType = pageType;
    this.productService.get(productId).subscribe( product  => {
      this.product = product;
      this.photos = product.Photos.map(photo => {
        const newPhoto = {
          imageSource: `${environment.endpointURL}/images/${photo.fileName}`
        };
        return newPhoto
      })
      this.slides = this.photos.map( photo => ({ image: photo.imageSource }));
    });
  }

  // analogon to showAvailability() method in ../create/create.component.ts
  showAvailability(): boolean {
    return this.product.productType === 'service' ||
    this.product.productType === 'good' &&
    this.product.purchaseType  === 'rent';
  }
}
