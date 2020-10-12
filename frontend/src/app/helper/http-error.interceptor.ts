import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap, finalize} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let error;
    return next.handle(request).pipe(
      tap( null, (err: HttpErrorResponse) => error = err),
      finalize(() => error ? this.snackBar.open(error.message) : null)
    );


  }
}
