import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { HotComponent } from './hot/hot.component';
import { MainComponent } from './main/main.component';
import { 
  FooterComponent,
  SidebarRightComponent
} from '../shared';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    DiscoveryComponent,
    HotComponent,
    MainComponent,
    FooterComponent,
    SidebarRightComponent
  ]
})
export class HomeModule { }
