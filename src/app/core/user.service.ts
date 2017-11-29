import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { User } from './user.model';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable()

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private tokenService: TokenService
  ) { }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.tokenService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.tokenService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/sign_in' : '';
    return this.apiService.post('/users' + route, { user: credentials })
      .map(
        data => {
          this.setAuth(data.user);
          console.log(data);
          return data;
        }
      );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
