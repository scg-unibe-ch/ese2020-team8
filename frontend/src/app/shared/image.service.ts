import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url = environment.endpointURL + '/images';

  constructor(
    private http: HttpClient
  ) { }

  upload(productId: number, files: FileList): Observable<any> {
    const formData = new FormData();
    Array.from(files).forEach( file => formData.append('images', file));
    return this.http.post(this.url + `/${productId}`, formData);
  }
}
