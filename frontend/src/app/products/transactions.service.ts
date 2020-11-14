import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  
  private url = environment.endpointURL + '/products';

  constructor(
    private http: HttpClient
  ) { }

  buy(product: IProduct, rentalDays?: number): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}/${product.id}/transactions`, product);
  }
}
