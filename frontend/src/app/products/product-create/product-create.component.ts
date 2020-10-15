import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm = this.fb.group({
    title: '',
    description: '',
    price: '',
    productType: '',
    purchaseType: '',
    availability: true,
    location: '',
    delivery: false
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.productService.create(
        this.productForm.value
    ).subscribe( product => {
      this.snackBar.open('Successfully created advertisement. Wait for an admin to approve it');
      this.router.navigate(['products']);
    });
  }

}
