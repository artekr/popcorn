import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Tag } from '../shared/tag.model';
import { HOTTAGS } from '../../mock-tags';

@Component({
  selector: 'hot-tags',
  templateUrl: './hot-tags.component.html',
  styleUrls: ['./hot-tags.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HotTagsComponent implements OnInit {

  hotTags: Tag[] = HOTTAGS;

  constructor() { }

  ngOnInit() {
  }

}
