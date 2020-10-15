import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-description-manager',
  templateUrl: './product-description-manager.component.html',
  styleUrls: ['./product-description-manager.component.css']
})
export class ProductDescriptionManager {
    productDescription = this.fb.group({
        price: '',
        availability: '',
        location: '',
        delivery: ''
    })
    constructor(
        private fb: FormBuilder,
        //private productService: ProductsService,
        //private router: Router,
        //private snackBar: MatSnackBar
      ) { }
}