import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

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
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
