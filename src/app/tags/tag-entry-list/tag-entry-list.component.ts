import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Entry } from '../../entries';
import { TagService } from '../shared/tag.service';

@Component({
  selector: 'app-tag-entry-list',
  templateUrl: './tag-entry-list.component.html',
  styleUrls: ['./tag-entry-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TagEntryListComponent implements OnInit {

  private tag_id : number;
  private entries: Entry[];

  constructor(
    private route     : ActivatedRoute,
    private tagService: TagService
  ) {}

  ngOnInit() {
    this.queryEntries();
  }

  queryEntries(): void {
    this.route.params.subscribe(params => {
      this.tag_id = +params['id']; // (+) converts string 'id' to a number
      this.tagService.queryEntriesByTagId(this.tag_id)
      .subscribe(
        data => {
          this.entries = data
        },
        error => {
          // TODO: error handling
          console.log("error " + error);
        }
      );
   });
  }
  
}
