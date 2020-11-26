import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private url = environment.endpointURL + '/questions';
  private answerUrl = this.url + '/answer';

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

  answer(questionId: string, text: string): Observable<IAnswer> {
    console.log('frontend service entered')
    return this.http.post<IAnswer>(this.answerUrl, 
      {
      questionId,
      text
    }
    );
  }

  getQuestionsPerProduct(productId): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${this.url}/prod/${productId}`);
  }

  get(questionId: string): Observable<IQuestion> {
    return this.http.get<IQuestion>(this.url + `/${questionId}`);
  }

}


export interface IQuestion {
  id: string;
  UserId: string;
  ProductId: string;
  text: string;
}

export interface IAnswer {
  id: string;
  UserId: string;
  QuestionId: string;
  text: string;
}
