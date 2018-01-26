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
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ApiService {

  constructor(
    private http         : HttpClient,
    private cookieService: CookieService
  ) { }

  public buildHeaders(): HttpHeaders {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('time_zone', 'UTC-05:00');

    if (this.cookieService.check('jwt') && this.cookieService.check('userid') ) {
      headers = headers.set('user_id', this.cookieService.get("userid"))
      .set('jwt', this.cookieService.get('jwt'));
    }
    return headers;
  }

  private formatErrors(error: any) {
    return Observable.throw(error);
  }

  get(path: string, params?: HttpParams): Observable<any> {
    var encodedURL = encodeURI(`${environment.api_url}${path}`);
    return this.http.get(
      encodedURL,
      {
        headers: this.buildHeaders(),
        params: params
      });
  }

  post(path: string, body: Object = {}): Observable<any> {
    var encodedURL = encodeURI(`${environment.api_url}${path}`);
    return this.http.post(
      encodedURL,
      JSON.stringify(body),
      { headers: this.buildHeaders() }
    )
      .pipe(
      catchError(this.formatErrors)
      )
  }

  put(path: string, body: Object = {}): Observable<any> {
    var encodedURL = encodeURI(`${environment.api_url}${path}`);
    return this.http.put(
      encodedURL,
      JSON.stringify(body),
      { headers: this.buildHeaders() }
    )
      .pipe(
      catchError(this.formatErrors)
      )
  }

  delete(path: string): Observable<any> {
    var encodedURL = encodeURI(`${environment.api_url}${path}`);
    return this.http.delete(
      encodedURL,
      { headers: this.buildHeaders() }
    )
      .pipe(
      catchError(this.formatErrors)
      )
  }
}
