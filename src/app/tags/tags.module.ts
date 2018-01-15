import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { SharedModule } from '../shared';
import { TagsComponent } from './tags.component';
import { TagEntryListComponent } from './tag-entry-list/tag-entry-list.component';

import { EntriesModule } from '../entries';

@NgModule({
  imports: [
    CommonModule,
    TagsRoutingModule,
    EntriesModule,
    SharedModule
  ],
  declarations: [
    TagsComponent,
    TagEntryListComponent
  ]
})
export class TagsModule { }
