import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService, IProduct} from '../products.service';
import {UserService} from 'src/app/user/user.service';
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


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
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
    city: new FormControl('')
  });  
  
  rentalDaysForm = new FormGroup({
    rentalDays: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductsService,
    private transactionService: TransactionsService
  ) { }

  
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(productId).subscribe( product  => {
      this.productId = product.id;
      this.product = product;
    });
  }

  calculatePrice(product: IProduct): void {
    const rentalDays = this.rentalDaysForm.value;
    console.log(rentalDays);
    console.log(product.price);
    const priceForCalc = product.price;

    const totalPrice = (parseInt(rentalDays)*parseInt(priceForCalc))
    const print = totalPrice;
    console.log(print);
/* 
    const price:number = product.price;
    console.log(price);
    console.log(isNaN(price));    
    console.log(isNaN(rentalDays));    
    console.log(typeof price);  
    console.log(typeof rentalDays);  
    const rentalDaysAsInt = parseInt(rentalDays);
    console.log(typeof rentalDaysAsInt);  
    console.log( totalPrice )
 */
   //this.transactionPrice = (rentalDays)*(product.price);
  // console.log(this.transactionPrice);
  }

/*   get totalPrice(product){
    return (product.price) * (pro.quantity) ;
  } */

  createDeliveryAddress(): void {
    const deliveryAddress = this.deliveryForm.value;
    console.log(deliveryAddress);
  }

  createTransaction(product: IProduct): void {
    this.transactionService.buy(product).subscribe(res => {
      //debugger;
      //ToDo Navigate to success page oder in history 
      console.log(res);
    });
 /*    const transaction = {
      price: product.price,
      ProductId: this.productId,
      productType: product.productType,
      purchaseType: product.purchaseType,
    };
    console.log(transaction); */
  }


  goToPay(product: IProduct): void {
    this.router.navigate(['products', product.id, 'pay' ]);
  }



}
