import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared';
import { 
  EntriesModule,
  EntryService
 } from '../entries';

import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { HotComponent } from './hot/hot.component';
import { DiscoveryComponent } from './discovery/discovery.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    EntriesModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    MainComponent,
    HotComponent,
    DiscoveryComponent
  ],
  providers: [
    EntryService
  ]
})
export class HomeModule { }
