import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IProduct } from '../products.service';
import { ProductsService } from '../products.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
  
  productId: string;
  photos: { imageSource: string }[];
  slides: { image: string }[]; //Array of images

  @Input() product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(productId).subscribe( product  => {
      this.product = product;
      this.photos = product.Photos.map(photo => {
        const newPhoto = {
          imageSource: `${environment.endpointURL}/images/${photo.fileName}`
        };
        return newPhoto
      })
      this.slides = this.photos.map( photo => ({ image: photo.imageSource }));
      console.log(this.slides);
    });
  }

  // analogon to showAvailability() method in ../create/create.component.ts
  showAvailability(): boolean {
    return this.product.productType === 'service' ||
    this.product.productType === 'good' &&
    this.product.purchaseType  === 'rent';
  }

  goToBuy(product: IProduct): void {
    this.router.navigate(['products', product.id, 'buy']);
  }

  goBackToMarketplace(): void {
    this.router.navigate(['products']);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location 
  }

}
