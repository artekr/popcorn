import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    ProfileHeaderComponent
  ]
})
export class ProfileModule { }
