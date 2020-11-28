import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../products.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  pageType: string;
  productId: string;
  panelOpenState = false;


  @Input() product: IProduct;
  photos: {imageSource: string; }[];
  slides: {image: string; }[];

  constructor(
  ) {}


  ngOnInit(): void {
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

}
