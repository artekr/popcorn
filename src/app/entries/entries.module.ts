import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesComponent } from './entries.component';
import { EntryComponent } from './entry/entry.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { CommentComponent } from './comment/comment.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EntriesComponent,
    EntryComponent,
    EntryListComponent,
    CommentComponent,
    EntryDetailComponent
  ],
  exports: [
    EntryListComponent
  ]
})
export class EntriesModule { }
