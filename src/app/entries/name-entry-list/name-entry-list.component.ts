import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Entry } from '../../entries';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-name-entry-list',
  templateUrl: './name-entry-list.component.html',
  styleUrls: ['./name-entry-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NameEntryListComponent implements OnInit {

  private entries   : Entry[];
  private entry_name: string;

  constructor(
    private route       : ActivatedRoute,
    private entryService: EntryService
  ) {}

  ngOnInit() {
    this.queryEntries();
  }

  queryEntries() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.entry_name = data[data.length - 1].path;
      this.entryService.queryEntriesByName(this.entry_name)
      .subscribe(
        data => {
          this.entries = data
        },
        error => {
          // TODO: error handling
          console.log("error " + error);
        }
      );
    },
    error => {
      // TODO: error handling
      console.log("error :" + error);
    }
    );
  }

}
