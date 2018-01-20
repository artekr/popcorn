import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { TagsComponent } from './tags.component';
import { TagEntryListComponent } from './tag-entry-list/tag-entry-list.component';

const routes: Routes = [
  {
    path: '',
    component: TagsComponent,
    children: [
      {
        path: 'tag/:id',
        component: TagEntryListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
