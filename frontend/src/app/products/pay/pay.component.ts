import { Component, OnInit } from '@angular/core';
import { IProduct, ProductsService } from '../products.service';
import {UserService} from 'src/app/user/user.service';
import { TransactionsService } from '../transactions.service';
import {
  FormControl,
  ValidatorFn,
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductsService,
    private transactionService: TransactionsService
  ) { }

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

  ngOnInit(): void {
  }

  buy(product: IProduct): void {
    const logInfo = 'Buy without delivery';
    console.log(logInfo);
    this.transactionService.buy(product).subscribe(res => {
      console.log(res);
      console.log('ToDo-Create a success page');
      this.router.navigate(['products', 'history']);
    });
  }

  buyWithDelivery(product: IProduct): void {
      const logInfo = 'Buy with delivery started';
      console.log(logInfo);
      const deliveryAddress = this.deliveryForm.value;
      console.log(deliveryAddress);
      this.transactionService.buy(product, deliveryAddress).subscribe(res => {
        console.log(res);
        console.log('ToDo-Create a success page');
        this.router.navigate(['products', 'history']);
      });
    };

  rent(product: IProduct): void {
      const logInfo = 'Create transaction with rental days';
      console.log(logInfo);
      const rentalDays = this.rentalDaysForm.value;
      console.log(rentalDays);
      this.transactionService.buy(product, rentalDays).subscribe(res => {
        console.log(res);
        console.log('ToDo-Create a success page');
        this.router.navigate(['products', 'history']);
      });
    };


  rentWithDelivery(product: IProduct): void {
      const logInfo = 'Create transaction with rental days and delivery';
      console.log(logInfo);
      const deliveryAddress = this.deliveryForm.value;
      console.log(deliveryAddress);
      const rentalDays = this.rentalDaysForm.value;
      console.log(rentalDays);
      //this.transactionService.buy(product, rentalDays, deliveryAddress).subscribe(res => {
      this.transactionService.buy(product, rentalDays).subscribe(res => {
          console.log(res);
        console.log('ToDo-Create a success page');
        this.router.navigate(['products', 'history']);
      });
    };


  goToPay(product: IProduct): void {
    this.router.navigate(['products', product.id, 'pay' ]);
  }

}
