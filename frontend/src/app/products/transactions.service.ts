import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private url = environment.endpointURL + '/products';
  private transactionUrl = environment.endpointURL + '/transactions';

  constructor(
    private http: HttpClient
  ) { }

  pay(product: IProduct, rentalDays?: number, deliveryAddress?: any): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}/${product.id}/transactions`, product);
  }

  /* orderProduct(): Observable<ITransaction> {
    return this.http.get<ITransaction>(`${this.url}/${product.id}/transactions`, product);
  } */

  getMyTransactions() {
    return this.http.get<ITransaction[]>(`${this.transactionUrl}/me`);
  }

}

export interface ITransaction extends ICreateTransactionRequestBody{
  id: number;
  price: number;
  ProductId: number;
  productType: string;
  purchaseType: string;
  buyerId: number;
  Product: IProduct;
}

export interface ICreateTransactionRequestBody {
  rentalDays?: number;
  address?: {
    firstName: string;
    lastName: string;
    streetNr: string;
    zip: number;
    city: string;
  }
}
