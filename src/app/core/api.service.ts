import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpResponse,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable()
export class ApiService {

  currentUser: User = new User();

  constructor(
    private http: HttpClient
  ) { }

  public buildHeaders(): HttpHeaders {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('time_zone', 'UTC-05:00');

    if (this.currentUser.id) {
      headers = headers.set('user_id', '1')
      .set('jwt', 'xxx');
    }
    
    return headers;
  }

  private formatErrors(error: any) {
    return Observable.throw(error);
  }

  get(path: string, params?: HttpParams): Observable<any> {
    return this.http.get(
      `${environment.api_url}${path}`,
      {
        headers: this.buildHeaders(),
        params: params
      });
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.buildHeaders() }
    )
      .pipe(
      catchError(this.formatErrors)
      )
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.buildHeaders() }
    )
      .pipe(
      catchError(this.formatErrors)
      )
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.buildHeaders() }
    )
      .pipe(
      catchError(this.formatErrors)
      )
  }
}
