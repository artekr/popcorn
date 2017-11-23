import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { 
  HeaderComponent, 
  FooterComponent,
  SidebarRightComponent
} from './layout';

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent,
    SidebarRightComponent
  ],
  exports: [
    CommonModule,
    HeaderComponent, 
    FooterComponent,
    SidebarRightComponent
  ]
})
export class SharedModule { }
