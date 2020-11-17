import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, IProduct } from '../products.service';
import { UserService } from 'src/app/user/user.service';
import * as core from '@angular/core';
import {
  FormControl,
  ValidatorFn,
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringify } from '@angular/compiler/src/util';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  productId: string;
  product: IProduct;
  transactionPrice: number;

  deliveryForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    streetNr: new FormControl(''),
    zip: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
    city: new FormControl(''),
  });

  rentalDaysForm = new FormGroup({
    rentalDays: new FormControl('', [Validators.required]),
  });

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductsService,
    private transactionService: TransactionsService,
    public dialog: MatDialog //private orderComponent: OrderComponent
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(productId).subscribe((product) => {
      this.productId = product.id;
      this.product = product;
    });
  }


  confirmOrder(): void {
    const order = {
      product: this.product,
      deliveryAddress: this.deliveryForm.value,
      rentalDays: this.rentalDaysForm.value,
    };


    this.dialog.open(OrderComponent, {
      height: '400px',
      width: '600px',
      data: order,
    }).afterClosed().subscribe(result => {
      debugger
      if (result) {
        this.buy();
      }
    });

  }

  // User press button 'pay' which then comes here and runs pay/transaction
  buy(): void {
    const product = this.product;
    const deliveryAddress = this.deliveryForm.value;
    const rentalDays = this.rentalDaysForm.value;
    // order
    this.transactionService
      .pay(product, rentalDays, deliveryAddress)
      .subscribe((res) => {
        this.router.navigate(['products', 'history']);
      });
  }
}
