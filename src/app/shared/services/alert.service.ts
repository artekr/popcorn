import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Alert, AlertType } from '../model';
import { Navigation } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  alert(type: AlertType, title: string, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{type: type, title: title, message: message});
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(title: string, message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, title, message, keepAfterRouteChange);
  }

  error(title: string, message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, title, message, keepAfterRouteChange);
  }

  info(title: string, message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, title, message, keepAfterRouteChange);
  }

  warning(title: string, message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, title, message, keepAfterRouteChange);
  }

  clear() {
    // clear alerts
    this.subject.next();
  }

}
