import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, IProduct } from '../products.service';
import { UserService } from 'src/app/user/user.service';
import { Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from '../order/order.component';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  productId: number;
  product: IProduct;
  transactionPrice: number;
  isChecked = false;

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
    public dialog: MatDialog, //private orderComponent: OrderComponent
    private location: Location,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(parseInt(productId, 10)).subscribe((product) => {
      this.productId = product.id;
      this.product = product;
    });
  }

  confirmOrder(): void {
    this.checkBudget().subscribe((hasEnoughMoney) => {
      if (hasEnoughMoney) {
        this.dialog
          .open(OrderComponent, {
            width: '600px',
            data: {
              product: this.product,
              deliveryAddress: this.deliveryForm.value,
              rentalDays: this.rentalDaysForm.get('rentalDays').value,
            },
          })
          .afterClosed()
          .subscribe((result) => {
            if (result) {
              this.buy();
            }
          });
      } else {
        this.snackbar.open(`You don't have enough money.`, 'close', {
          duration: 5000,
        });
      }
    });
  }

  // User press button 'pay' which then comes here and runs pay/transaction
  buy(): void {
    const product = this.product;
    const deliveryAddress = this.deliveryForm.value;
    const rentalDays = this.rentalDaysForm.get('rentalDays').value;
    // order
    this.transactionService
      .pay(product, rentalDays, deliveryAddress)
      .subscribe((res) => {
        this.router.navigate(['products', 'history']);
      });
  }

  goBack() {
    this.location.back(); // <-- go back to previous location
  }

  checkBudget() {
    const total = this.rentalDaysForm.get('rentalDays').value
      ? this.rentalDaysForm.get('rentalDays').value * this.product.price
      : this.product.price;
    const hasEnoughMoney = this.userService
      .getProfile()
      .pipe(map((profile) => profile.wallet >= total));
    return hasEnoughMoney;
  }
}
