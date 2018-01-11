import { Injectable } from '@angular/core';
import { User, ApiService } from '../core';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfileService {
    private user: Subject<User> = new BehaviorSubject<User>(new User());

    constructor(private apiService: ApiService) {
    }

    updateUser(username: string) {
        const params = new HttpParams()
            .set('username', username)
            .set('with_statistics', 'true');

        this.apiService.get("/users", params).subscribe(
            response => {
                console.log(response[0]);
                this.user.next(response[0]);
            },
            (err: HttpErrorResponse) => {
                console.log("Got error during retreve user " + username + ". " + err);
            }
        );
    }

    getUserSubject(): Observable<User> {
        return this.user.asObservable();
    }
}