import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private url = environment.endpointURL + '/products/favorites';

  constructor(private http: HttpClient) {}

  create(productId: number): Observable<IFavorite> {
    return this.http.post<IFavorite>(this.url, { productId });
  }

  getMyFavorites(): Observable<IFavorite[]> {
    return this.http.get<IFavorite[]>(this.url);
  }

  delete(favoriteId: number): Observable<IFavorite> {
    return this.http.delete<IFavorite>(`${this.url}/${favoriteId}`);
  }
}

export interface IFavorite {
  id: number;
  userId: number;
  productId: IProduct;
}
