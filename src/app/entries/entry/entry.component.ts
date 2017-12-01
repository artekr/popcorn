import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EntryComponent implements OnInit {
  @Input() entry: Entry;

  showComment: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
