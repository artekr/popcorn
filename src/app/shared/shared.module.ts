import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { CookieService } from 'ngx-cookie-service';

import { ShowAuthedDirective } from '../core/auth/show-authed.directive';
import { EntryService } from '../entries/shared';
import { UserService } from '../core/user.service';
import { SharedService } from './services';
import { MessageComponent } from './message/message.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HotTagsComponent } from '../tags/hot-tags/hot-tags.component';
import { RelatedTagsComponent } from '../tags/related-tags/related-tags.component';
import { RelatedEntriesComponent } from '../entries/related-entries/related-entries.component';
import {
  AlertComponent,
  HeaderComponent, 
  FooterComponent,
  SidebarRightComponent,
  AddEntryComponent
} from './layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AlertComponent,
    AddEntryComponent,
    HeaderComponent, 
    FooterComponent,
    SidebarRightComponent,
    ShowAuthedDirective,
    MessageComponent,
    PaginationComponent,
    HotTagsComponent,
    RelatedTagsComponent,
    RelatedEntriesComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    SidebarRightComponent,
    ShowAuthedDirective,
    MessageComponent,
    PaginationComponent
  ],
  providers: [
    UserService,
    EntryService,
    CookieService,
    SharedService
  ]
})
export class SharedModule { 
  static isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (SharedModule.isMobile.Android() || SharedModule.isMobile.BlackBerry() || SharedModule.isMobile.iOS() || SharedModule.isMobile.Opera() || SharedModule.isMobile.Windows());
    }
  };
}
