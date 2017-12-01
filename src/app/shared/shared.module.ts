import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { ShowAuthedDirective } from '../core/auth/show-authed.directive';
import { UserService } from '../core/user.service';
import { 
  HeaderComponent, 
  FooterComponent,
  SidebarRightComponent
} from './layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent,
    SidebarRightComponent,
    ShowAuthedDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderComponent, 
    FooterComponent,
    SidebarRightComponent,
    ShowAuthedDirective
  ],
  providers: [
    UserService
  ]
})
export class SharedModule { }
