import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Tag } from '../../../tags';
import { HOTTAGS } from '../../../mock-tags';

@Component({
  selector: 'layout-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarRightComponent implements OnInit {

  hotTags: Tag[] = HOTTAGS;
  
  constructor() { }

  ngOnInit() {
  }

}
