import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { CookieService } from 'ngx-cookie-service';

import { ShowAuthedDirective } from '../core/auth/show-authed.directive';
import { UserService } from '../core/user.service';
import {
  AlertComponent,
  HeaderComponent, 
  FooterComponent,
  SidebarRightComponent
} from './layout';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    AlertComponent,
    HeaderComponent, 
    FooterComponent,
    SidebarRightComponent,
    ShowAuthedDirective,
    MessageComponent
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
    MessageComponent
  ],
  providers: [
    UserService,
    CookieService
  ]
})
export class SharedModule { }
