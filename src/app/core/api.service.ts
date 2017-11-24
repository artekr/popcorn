import { Injectable } from '@angular/core';
import { 
  HttpHeaders,
  HttpClient,
  HttpResponse,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // TODO: check token

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error);
  }

  /**
   * Override the HttpClient common methods
   */
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(
      `${environment.api_url}${path}`,
      {
        headers: this.setHeaders(),
        params: params
      })
      .pipe(
        catchError(this.formatErrors)
      )
  }

}
