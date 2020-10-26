import { Component, OnInit, Input } from '@angular/core';
import {IProduct} from '../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() product: IProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
