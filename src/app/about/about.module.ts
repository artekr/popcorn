import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../shared';
import { AboutRoutingModule } from './about-routing.module';

import { AboutComponent } from './about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { UsComponent } from './us/us.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    AboutRoutingModule,
    SharedModule
  ],
  declarations: [
    AboutComponent,
    PrivacyComponent,
    DisclaimerComponent,
    UsComponent,
    ContactComponent
  ]
})
export class AboutModule { }
