import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {IProduct} from '../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() product: IProduct;
  defaultImage: string;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.defaultImage = this.product.Photos.length ? `${environment.endpointURL}/images/${this.product.Photos[0].fileName}`: '/assets/boat.png';
  }

  goToDetails(product: IProduct): void {
    this.router.navigate(['products', product.id, 'show']);
  }
}
