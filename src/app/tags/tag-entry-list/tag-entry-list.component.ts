import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Entry } from '../../entries';
import { TagService } from '../shared/tag.service';
import { SharedService } from '../../shared';

@Component({
  selector: 'app-tag-entry-list',
  templateUrl: './tag-entry-list.component.html',
  styleUrls: ['./tag-entry-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TagEntryListComponent implements OnInit, OnDestroy {

  private tag_name: string;
  private entries : Entry[];
  private sub     : any;

  constructor(
    private route        : ActivatedRoute,
    private tagService   : TagService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.queryEntries();
  }

  queryEntries(): void {
    this.sub = this.route.params.subscribe(params => {
      var tag_id = +params['id']; // (+) converts string 'id' to a number
      this.tagService.queryEntriesByTagId(tag_id)
      .subscribe(
        response => {
          this.tag_name = response['requestParameters']['name'];
          this.entries  = response['data']['content'];
          this.sharedService.emitTagId(response['requestParameters']['id']);
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
