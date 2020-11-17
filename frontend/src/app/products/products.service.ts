import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = environment.endpointURL + '/products';

  constructor(
    private http: HttpClient
  ) { }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, product);
  }

  update(productId: string, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(this.url + `/${productId}`, product);
  }

  delete(product: IProduct): Observable<IProduct> {
    return this.http.delete<IProduct>(this.url + `/${product.id}`);
  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }

  get(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(this.url + `/${productId}`);
  }

  getMyProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + '/me');
  }

  getAllPending(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + '/pending');
  }

  approve(productId: string): Observable<IProduct> {
    return this.http.put<IProduct>(this.url + `/${productId}/approve`, {});
  }

}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: string;
    productType: string;
    purchaseType: string;
    availability: boolean;
    location: string;
    duration: number;
    delivery: boolean;
    status: string;
    UserId: number;
    Photos: {
      fileName: string;
    }[];
}
