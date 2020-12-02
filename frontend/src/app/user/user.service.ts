import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.endpointURL + '/user';

  token: string;
  user: UserToken;
  loggedIn: boolean;
  isAdmin: boolean;

  walletInfo$ = this.http.get<UserProfile>(`${this.url}/me`).pipe( map(user => user.wallet));

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
    ) {
    this.checkUserStatus();
  }

  register(user: User): Observable<any> {
    return this.http
      .post(this.url + '/register', user)
      .pipe(catchError((err) => this.handleError(err)));
  }

  login(user: User): Observable<any> {
    return this.http
      .post(this.url + '/login', {
        userName: user.userName,
        password: user.password,
      })
      .pipe(
        map(
          (res: {
            token: string;
            user: {
              userName: string;
            };
          }) => {
            // Set user data in local storage
            localStorage.setItem('userToken', res.token);
            localStorage.setItem('userName', res.user.userName);

            this.checkUserStatus();
          }
        )
      );
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.checkUserStatus();
    this.router.navigate(['/']);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/edit', user);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.url + '/me');
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.token = localStorage.getItem('userToken');

    if (this.token) {
      const user: UserToken = JSON.parse(atob(this.token.split('.')[1]));

      this.user = user;
      this.isAdmin = user.isAdmin;
    }

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!this.token;
  }

  accessSecuredEndpoint(): Observable<any> {
    return this.http.get(environment.endpointURL + '/secured');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this._snackBar.open('Backend not running?' + error.error.message);
    } else if (
      error.error.hasOwnProperty('name') &&
      ['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(
        error.error.name
      )
    ) {
      console.error(
        `Backend returned error: ${error.error.errors[0].message} `
      );
      this._snackBar.open(
        `Backend returned error: ${error.error.errors[0].message} `
        , 'close', {
          duration: 5000,
        })
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      this._snackBar.open(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        , 'close', {
          duration: 5000,
        })
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

}

interface UserProfile {
  wallet: number;
}

export interface UserToken {
  userName: string;
  userId: number;
  isAdmin: boolean;
}

