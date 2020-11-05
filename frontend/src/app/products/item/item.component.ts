import { Component, OnInit, Input } from '@angular/core';
import {IProduct} from '../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() product: IProduct;
  defaultImage: string;

  constructor() { }

  ngOnInit(): void {
    this.defaultImage = this.product.Photos.length ? `/api/images/${this.product.Photos[0].fileName}`: '/assets/boat.png';
  }

}
