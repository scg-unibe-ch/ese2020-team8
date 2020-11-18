import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct } from './products.service';
import { ITransaction } from './transactions.service';
@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
  private url = environment.endpointURL + '/notifications';



  constructor(
    private http: HttpClient
  ) { }

  getMyNotifications() {
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

