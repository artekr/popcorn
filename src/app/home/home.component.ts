import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SidebarComponentType } from '../shared/model';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  private hotTags: SidebarComponentType[];

  constructor() {}

  ngOnInit() {
    this.hotTags = [SidebarComponentType.HotTags];   
  }

}
