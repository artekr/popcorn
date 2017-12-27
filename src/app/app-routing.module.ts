import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
  },
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule'
  }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes) 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
