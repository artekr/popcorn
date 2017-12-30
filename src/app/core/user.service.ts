import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from './user.model';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable()

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http         : HttpClient,
    private apiService   : ApiService,
    private jwtService   : JwtService,
    private cookieService: CookieService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    // if (this.jwtService.getToken()) {
    //   this.apiService.get('/user')
    //   .subscribe(
    //     data => this.setAuth(data),
    //     err => this.purgeAuth()
    //   );
    if (this.cookieService.check("jwt")) {
      this.isAuthenticatedSubject.next(true);
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    // this.jwtService.saveToken(user.jwt);
    this.cookieService.set("jwt", user.jwt);
    this.cookieService.set("userid", String(user.id));
    this.cookieService.set("username", user.username);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    // this.jwtService.destroyToken();
    this.cookieService.deleteAll();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/sign-in' : '';
    return this.apiService.post('/users' + route, credentials)
      .map(
        data => {
          this.setAuth(data);
          console.log(data);
          return data;
        }
      );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
