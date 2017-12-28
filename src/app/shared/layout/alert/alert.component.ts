import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { Alert, AlertType } from '../../model';
import { AlertService } from '../../services';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {

  alert: Alert;

  constructor(
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        return;
      }
      this.alert = alert;
    });
  }

  removeAlert(alert: Alert) {
    this.alert = null;
  }

}
