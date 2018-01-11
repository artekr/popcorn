import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { MyEntriesComponent } from './my-entries/my-entries.component';
import { MyCommentsComponent } from './my-comments/my-comments.component';
import { MyWordbooksComponent } from './my-wordbooks/my-wordbooks.component';
import { EntriesModule } from '../entries';
import { SharedModule } from '../shared';
import { AlertService } from '../shared/services';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProfileService } from './profile.service';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    EntriesModule,
    SharedModule,
    InfiniteScrollModule
  ],
  declarations: [
    ProfileComponent,
    ProfileHeaderComponent,
    MyEntriesComponent,
    MyCommentsComponent,
    MyWordbooksComponent
  ],
  providers: [
    AlertService,
    ProfileService
  ]
})
export class ProfileModule { }
