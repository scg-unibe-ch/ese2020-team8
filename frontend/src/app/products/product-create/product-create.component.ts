import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm = this.fb.group({
    productName: '',
    price: '',
    category: ''
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productService.create(
      {
        name: this.productForm.value.productName,
        price: this.productForm.value.price,
      }
    );
  }

}
