import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = [
    {
      name: 'Prod1',
      price: 120
    },
    {
      name: 'Prod2',
      price: 120
    },
    {
      name: 'Prod2',
      price: 120
    }
  ]

  constructor(
  ) { }

  getProductsWithoutApproval() {
  }
}

interface IProduct {
  name: string;
  price: number;
}
