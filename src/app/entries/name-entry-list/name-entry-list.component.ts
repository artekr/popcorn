import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Entry } from '../../entries';
import { EntryService } from '../shared/entry.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-name-entry-list',
  templateUrl: './name-entry-list.component.html',
  styleUrls: ['./name-entry-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NameEntryListComponent implements OnInit, OnDestroy {

  private entries   : Entry[];
  private entry_name: string;
  private sub       : any;

  constructor(
    private route        : ActivatedRoute,
    private entryService : EntryService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.queryEntries();
  }

  queryEntries() {
    this.sub = this.route.params.subscribe(params => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.entry_name = params['name'];
      this.entryService.queryEntriesByName(this.entry_name)
        .subscribe(
          data => {
            this.sharedService.emitEntryName(this.entry_name);
            this.entries = data;
          },
          error => {
            // TODO: error handling
            console.log("error " + error);
          }
        );  
    });
  }
  
  ngOnDestroy() {
    if(this.sub != null) {
      this.sub.unsubscribe();
    }
  }

}
