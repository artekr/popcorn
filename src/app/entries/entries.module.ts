import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EntriesComponent } from './entries.component';
import { EntryComponent } from './entry/entry.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { CommentComponent } from './comment/comment.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { ConvertToDatePipe } from './shared/convertToDate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EntriesComponent,
    EntryComponent,
    EntryListComponent,
    CommentComponent,
    EntryDetailComponent,
    ConvertToDatePipe
  ],
  exports: [
    EntryListComponent,
    EntryComponent
  ]
})
export class EntriesModule { }
