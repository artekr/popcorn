import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Tag, TagService } from '../shared';

@Component({
  selector: 'hot-tags',
  templateUrl: './hot-tags.component.html',
  styleUrls: ['./hot-tags.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HotTagsComponent implements OnInit {

  private hotTags: Tag[];

  constructor(
    private tagService: TagService
  ) {}

  ngOnInit() {
    this.tagService.queryHotTags().subscribe(
      data => {
        this.hotTags = data
      },
      error => {
        // TODO: error handling
        console.log("error " + error);
      }
    );
  }

}
