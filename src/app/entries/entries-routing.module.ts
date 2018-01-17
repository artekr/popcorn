import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { EntriesComponent } from './entries.component';
import { NameEntryListComponent } from './name-entry-list/name-entry-list.component';

const routes: Routes = [
  {
    path: '',
    component: EntriesComponent,
    children: [
      {
        path: 'entry/:name',
        component: NameEntryListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
