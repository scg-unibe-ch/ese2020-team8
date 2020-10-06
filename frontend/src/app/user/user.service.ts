import { Injectable } from '@angular/core';
import { User } from "./user";
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.endpointURL + 'user';

  constructor(
    private http: HttpClient
  ) { }

  register(user: User) {
    return this.http.post(this.url + '/register', user);
  }
}
