import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { HomeComponent } from './home.component';
import { HotComponent } from './hot/hot.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'hot',
        component: HotComponent
      },
      {
        path: 'discovery',
        component: DiscoveryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
