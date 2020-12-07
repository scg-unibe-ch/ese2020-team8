import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Location } from '@angular/common';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar, 
    private router: Router, 
    private userService: UserService, 
    private location: Location
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let error;
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => (error = err)),
      finalize(() => {
        if (error) {
          if (error.error) {
            switch (error.error.name) {
              case 'BuyProduct' : {
                this.snackBar.open(error.error.message, 'Back to Marketplace', {
                  duration: 10000,
                })
                .onAction().subscribe(
                  () => {
                    this.router.navigate([''])
                  }
                );
                break;
              }
              case 'NotYourProduct' : {
                this.snackBar.open(error.error.message, 'Back to Marketplace', {
                  duration: 10000,
                })
                .onAction().subscribe(
                  () => {
                    this.router.navigate([''])
                  }
                );
                break;
              }
              case 'NotAdmin' : {
                this.snackBar.open(error.error.message, 'Back', {
                  duration: 10000,
                })
                .onAction().subscribe(
                  () => {
                    this.location.back()
                  }
                );
                break;
              }
              case 'TokenExpiredError' : {
                this.userService.logout();
                this.router.navigate(['login']);
                this.snackBar.open('Your session expired.', 'Log in', {
                  duration: 10000, })
                  .onAction().subscribe(
                    () => {
                      this.router.navigate(['user', 'login'])
                    }
                  );
                break;
              }
              case 'NotLoggedIn' : {
                this.snackBar.open(error.error.message, 'Log in', {
                  duration: 10000, })
                .onAction().subscribe(
                  () => {
                    this.router.navigate(['user', 'login'])
                  }
                );
                break;
              }
              default : {
                this.snackBar.open(error.error.message, 'close', {
                duration: 10000, });
                break;
              }
            }
          }
          else { this.snackBar.open(error.message + ' | Error type: ' + error.name, 'close'); }
          //this.snackBar.open(error.message + ' | Error type: ' + error.name, 'close');
        }
        else { null }
      }
      )
    );
  }
}
