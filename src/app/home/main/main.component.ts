import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Entry } from '../../entries';
import { ENTRIES } from '../../mock-entries';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {

  entries: Entry[] = ENTRIES;

  constructor() { }

  ngOnInit() {
  }

}
