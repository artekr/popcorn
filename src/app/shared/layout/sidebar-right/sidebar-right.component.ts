import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { SidebarComponentType } from '../../model';

@Component({
  selector: 'layout-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarRightComponent implements OnInit {
  
  @Input() childComponentType : SidebarComponentType[];
  
  private showHotTags: boolean        = false;
  private showRelatedTags: boolean    = false;
  private showRelatedEntries: boolean = false;

  constructor() {}

  ngOnInit() {
    if (this.childComponentType) {
      for (let type of this.childComponentType) {
        switch(type) {
          case SidebarComponentType.HotTags: {
            this.showHotTags = true;
            break;
          }
          case SidebarComponentType.RelatedTags: {
            this.showRelatedTags = true;
            break;
          }
          case SidebarComponentType.RelatedEntries: {
            this.showRelatedEntries = true;
            break;
          }
          default: {
            this.showHotTags = true;
            break;
          }
        }
      }
    }
  }

}
