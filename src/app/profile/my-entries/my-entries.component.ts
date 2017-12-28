import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Entry} from '../../entries';
import { ENTRIES } from "../../mock-entries";

@Component({
  selector: 'app-my-entries',
  templateUrl: './my-entries.component.html',
  styleUrls: ['./my-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyEntriesComponent implements OnInit {
  entries: Entry[];

  constructor() { }

  ngOnInit() {
    this.entries = ENTRIES;
  }

}
