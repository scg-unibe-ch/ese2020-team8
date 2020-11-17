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
import { OrderComponent } from 'src/app/order/order.component';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent extends OrderComponent implements OnInit  {
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
    public dialog: MatDialog,
    private orderComponent: OrderComponent
  ) {
    super(dialog, router)
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(productId).subscribe((product) => {
      this.productId = product.id;
      this.product = product;
    });
  }
  /*
  calculatePrice(product: IProduct): void {
    const rentalDays = this.rentalDaysForm.value;
    console.log(rentalDays);
    console.log(product.price);
    const priceForCalc = product.price;

    const totalPrice = (parseInt(rentalDays)*parseInt(priceForCalc))
    const print = totalPrice;
    console.log(print);

    const price:number = product.price;
    console.log(price);
    console.log(isNaN(price));
    console.log(isNaN(rentalDays));
    console.log(typeof price);
    console.log(typeof rentalDays);
    const rentalDaysAsInt = parseInt(rentalDays);
    console.log(typeof rentalDaysAsInt);
    console.log( totalPrice )

   //this.transactionPrice = (rentalDays)*(product.price);
  // console.log(this.transactionPrice);
  }

   */

  /*   get totalPrice(product){
    return (product.price) * (pro.quantity) ;
  } */

  /* createDeliveryAddress(): void {
    const deliveryAddress = this.deliveryForm.value;
    console.log(deliveryAddress);
  } */

  confirmOrder(  ): void {
    const order = {
      product: this.product,
      deliveryAddress: this.deliveryForm.value,
      rentalDays: this.rentalDaysForm.value
    }
/*     product = this.product;
    deliveryAddress = this.deliveryForm.value;
    rentalDays = this.rentalDaysForm.value; */
    this.orderComponent.openDialog(  );

    //console.log("showing your order here: " + product.price + deliveryAddress.value + rentalDays.value)

    // hier soll eine Zusammenfassung der Bestellung inkl der angegebenen Lieferadresse angezeigt werden
    // über Button pay wird transaction erstellt
    // mit zurück können Angaben geändert werden
  }

  // User press button 'pay' which then comes here and runs pay/transaction
  buy(): void {
    const product = this.product;
    const deliveryAddress = this.deliveryForm.value;
    const rentalDays = this.rentalDaysForm.value;
    // order
    this.transactionService
      .pay(product, rentalDays, deliveryAddress)
      .subscribe((res) => {});
  }
}


