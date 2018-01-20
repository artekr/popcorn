import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SidebarComponentType } from '../shared/model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TagsComponent implements OnInit {

  private relatedTags: SidebarComponentType[];

  constructor() { }

  ngOnInit() {
    this.relatedTags = [SidebarComponentType.RelatedTags];
  }

}
