import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, UrlTree } from "@angular/router";

import { Tag, TagService } from '../shared';

@Component({
  selector: 'related-tags',
  templateUrl: './related-tags.component.html',
  styleUrls: ['./related-tags.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RelatedTagsComponent implements OnInit {

  private relatedTags: Tag[];
  private isLoading  : boolean = false;

  constructor(
    private router    : Router,
    private tagService: TagService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.queryRelatedTags();
  }

  queryRelatedTags() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const urlSegments =  tree.root.children['primary'].segments;
    var tag_id = +urlSegments[urlSegments.length - 1].path; // (+) converts string 'id' to a number
    //console.log("related tag id: " + tag_id);
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

}
