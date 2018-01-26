import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, UrlTree } from "@angular/router";

import { Tag, TagService } from '../shared';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'related-tags',
  templateUrl: './related-tags.component.html',
  styleUrls: ['./related-tags.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RelatedTagsComponent implements OnInit, OnDestroy {

  private relatedTags: Tag[];
  private isLoading  : boolean = false;
  private sub        : any;

  constructor(
    private router    : Router,
    private tagService: TagService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.sub = this.sharedService.tagIdEmitted$.subscribe(
      tag_id => { 
        this.queryRelatedTagsById(tag_id);
      }
    );
  }

  queryRelatedTagsById(tag_id: number) {
    this.tagService.queryRelatedTagsById(tag_id)
      .subscribe(
        data => {
          this.relatedTags = data
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
