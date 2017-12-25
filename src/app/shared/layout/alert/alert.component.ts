import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Alert, ALERT_TYPE } from './alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {

  @Input() alert: Alert;

  constructor() { }

  ngOnInit() {
  }

}
