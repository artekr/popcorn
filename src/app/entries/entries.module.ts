import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';
import { EntriesComponent } from './entries.component';
import { EntryComponent } from './entry/entry.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { CommentComponent } from './comment/comment.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { NameEntryListComponent } from './name-entry-list/name-entry-list.component';
import { ConvertToDatePipe } from './shared/convertToDate.pipe';
import { EntriesRoutingModule } from './entries-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EntriesRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    EntriesComponent,
    EntryComponent,
    EntryListComponent,
    CommentComponent,
    EntryDetailComponent,
    NameEntryListComponent,
    ConvertToDatePipe
  ],
  exports: [
    EntryListComponent,
    EntryComponent,
    ConvertToDatePipe
  ]
})
export class EntriesModule { }
