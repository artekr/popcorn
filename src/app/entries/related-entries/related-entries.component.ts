import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Entry, EntryService } from '../shared';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'related-entries',
  templateUrl: './related-entries.component.html',
  styleUrls: ['./related-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RelatedEntriesComponent implements OnInit, OnDestroy {

  private relatedEntries: Entry[];
  private isLoading     : boolean = false;
  private sub           : any;

  constructor(
    private router       : Router,
    private entryService : EntryService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.sub = this.sharedService.entryNameEmitted$.subscribe(
      entry_name => {
        this.queryRelatedEntriesByName(entry_name);
      }
    );
  }

  queryRelatedEntriesByName(entry_name: string) {
    this.entryService.queryRelatedEntriesByName(entry_name)
      .subscribe(
        response => {
          this.relatedEntries = response['data']['content'];
          this.isLoading   = false;
        },
        error => {
          // TODO: error handling
          console.log("error " + error);
        }
      );
  }

  ngOnDestroy() {
    if(this.sub != null) {
      this.sub.unsubscribe();
    }
  }
}
