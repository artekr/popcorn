import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { AboutComponent } from './about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { UsComponent } from './us/us.component';
import { ContactComponent } from './contact/contact.component';

const aboutRouting: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    children: [
      {
        path: '',
        component:UsComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'privacy',
        component: PrivacyComponent
      },
      {
        path: 'disclaimer',
        component: DisclaimerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(aboutRouting)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
