import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';
import { UrlTree, UrlSegmentGroup, UrlSegment } from '@angular/router/src/url_tree';
import { PRIMARY_OUTLET } from '@angular/router/src/shared';

@Component({
  selector: 'related-tags',
  templateUrl: './related-tags.component.html',
  styleUrls: ['./related-tags.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RelatedTagsComponent implements OnInit {

  private tag_id     : number;
  private relatedTags: Tag[];

  constructor(
    private router    : Router,
    private tagService: TagService
  ) {}

  ngOnInit() {
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
        },
        error => {
          // TODO: error handling
          console.log("error " + error);
        }
      );
  }

}
