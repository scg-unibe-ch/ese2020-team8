import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = [
    {
      id: 0,
      title: 'Prod1',
      description: 'this is product number 1'
    },
    {
      id: 1,
      title: 'Prod2',
      description: 'this is product number 3'
    },
    {
      id: 2,
      title: 'Prod3',
      description: 'this is product number 3'
    }
  ];

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
