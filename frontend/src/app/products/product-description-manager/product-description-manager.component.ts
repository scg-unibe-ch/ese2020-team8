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
export class ProductDescriptionManagerComponent implements OnInit {

  private bGood : boolean;
  private bBuy : boolean;

  productForm = this.fb.group({
    title: '',
    description: '',
    price: '',
    productType: '',
    purchaseType: '',
    availability: '',
    location: '',
    delivery: ''
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

  inputCheck(event): void {
    switch (event.value) {
      case 'good' : {
        this.bGood = true;
        break;
      }
      case 'service' : {
        this.bGood = false;
        break;
      }
      case 'buy' : {
        this.bBuy = true;
        break;
      }
      case 'rent' : {
        this.bBuy = false;
        break;
      }
      default : {
        break;
      }
    }
  }
  getbGood() : boolean {
    return this.bGood;
  }
  getbBuy() : boolean {
    return this.bBuy;
  }
}
