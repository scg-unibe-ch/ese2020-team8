import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm = this.fb.group({
    title: '',
    description: ''
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productService.create(
        this.productForm.value
    );
    this.router.navigate(['products']);
  }

}
