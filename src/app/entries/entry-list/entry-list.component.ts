import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EntryListComponent implements OnInit {
  @Input() entries: Entry[];

  constructor() { }

  ngOnInit() {
  }

}
