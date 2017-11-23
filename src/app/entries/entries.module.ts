import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesComponent } from './entries.component';
import { EntryComponent } from './entry/entry.component';
import { EntryListComponent } from './entry-list/entry-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EntriesComponent,
    EntryComponent,
    EntryListComponent
  ],
  exports: [
    EntryListComponent
  ]
})
export class EntriesModule { }
