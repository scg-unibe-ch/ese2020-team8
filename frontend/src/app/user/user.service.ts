import { Injectable } from '@angular/core';
import { User } from "./user";
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.endpointURL + '/user';

  token: string;
  user: string;
  loggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private http: HttpClient
  ) {
    this.checkUserStatus();
  }

  register(user: User): Observable<any> {
    return this.http.post(this.url + '/register', user);
  }

  login(user: User): Observable<any> {
    return this.http.post(this.url + '/login', {
      userName: user.userName,
      password: user.password
    })
    .pipe(
      map( (res: {
        token: string;
        user: {
          userName: string;
        };
      })  => {
             // Set user data in local storage
        localStorage.setItem('userToken', res.token);
        localStorage.setItem('userName', res.user.userName);

        this.checkUserStatus();
      })
    );
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.token = localStorage.getItem('userToken');

    if (this.token) {
      const user = JSON.parse(atob(this.token.split('.')[1]));

      this.user = user.userName;
      this.isAdmin = user.isAdmin;
    }

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.token);
  }

  accessSecuredEndpoint(): Observable<any> {
    return this.http.get(environment.endpointURL + '/secured');
  }
}
