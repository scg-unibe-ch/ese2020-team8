import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = [
    {
      id: 0,
      name: 'Prod1',
      price: 60
    },
    {
      id: 1,
      name: 'Prod2',
      price: 120
    },
    {
      id: 2,
      name: 'Prod3',
      price: 100
    }
  ]

  constructor(
  ) { }

  create(product) {
    this.products.push(product)
  }

  getProducts() {
    return this.products;
  }

  getProductsWithoutApproval() {
    return this.products;
  }
}

interface IProduct {
  name: string;
  price: number;
}
