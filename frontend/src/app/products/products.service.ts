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

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }

  getAllPending(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + '/pending');
  }

  approve(productId: number): Observable<IProduct> {
    return this.http.put<IProduct>(this.url + `/${productId}/approve`, {});
  }
}

export interface IProduct { //types of product missing
  productId: number;
  title: string;
  description: string;
  price: number;
  availability: boolean;
  location: string;
  delivery: boolean;
}
