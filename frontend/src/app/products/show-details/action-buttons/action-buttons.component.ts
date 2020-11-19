import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IProduct } from '../../products.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  goToBuy(product: IProduct): void {
    this.router.navigate(['products', product.id, 'buy']);
  }

  goBack() {
    this.location.back();
  }

}