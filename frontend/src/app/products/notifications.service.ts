import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, merge } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITransaction } from './transactions.service';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private url = environment.endpointURL + '/notifications';

  public myNewNotifications = merge(
    this.http.get<{ count: number }>(`${this.url}/new`),
    interval(10000).pipe(
      switchMap(() => this.http.get<{ count: number }>(`${this.url}/new`))
    )
  );

  constructor(private http: HttpClient) {}

  getMyNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>(`${this.url}/me`);
  }
}

export interface INotification {
  id: number;
  UserId: number;
  notificationType: string;
  TransactionId: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
  Transaction: ITransaction;
  contactEmail: string;
}
