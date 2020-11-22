import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private url = environment.endpointURL + '/questions';

  constructor(
    private http: HttpClient
  ) { }
  
  ask(productId: string, text: string): Observable<IQuestion> {
    return this.http.post<IQuestion>(this.url, 
      {
      productId,
      text
    }
    );
  }

  getQuestionsPerProduct(productId): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${this.url}/${productId}`);
  }
}


export interface IQuestion {
  id: string;
  UserId: number;
  ProductId: string;
  text: string;
}
