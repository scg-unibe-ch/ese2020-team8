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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let error;
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => (error = err)),
      finalize(() => {
        if (error) {
          switch (error.type) {
            case 'BuyOwnProduct' : {

            }
            case 'NotYourProduct' : {

            }
            case 'NotAdmin' : {

            }
            case 'NotLoggedIn' : {
              this.snackBar.open(error.message, 'Log in', {
                duration: 5000,
              })
              .onAction().subscribe(
                () => {
                  this.router.navigate(['login'])
                }
              );
            }
            default : this.snackBar.open(error.message, 'close', {
              duration: 5000,
            })
          }
        }
        else { null }
      }
      )
    );
  }
}
