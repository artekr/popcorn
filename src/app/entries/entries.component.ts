import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SidebarComponentType } from '../shared/model';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EntriesComponent implements OnInit {

  private relatedEntries: SidebarComponentType[];

  constructor() { }

  ngOnInit() {
    this.relatedEntries = [SidebarComponentType.RelatedEntries];
  }

}
