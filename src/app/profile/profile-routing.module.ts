import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MyCommentsComponent } from './my-comments/my-comments.component';
import { MyEntriesComponent } from './my-entries/my-entries.component';
import { MyWordbooksComponent } from './my-wordbooks/my-wordbooks.component';

const routes: Routes = [
    {
      path: '',
      component: ProfileComponent,
      children: [
        {
          path: '',
          redirectTo: 'my-entries',
          pathMatch: 'full'
        },
        {
          path: 'my-entries',
          component: MyEntriesComponent,
        },
        {
          path: 'my-comments',
          component: MyCommentsComponent,
        },
        {
          path: 'my-wordbooks',
          component: MyWordbooksComponent,
        }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class ProfileRoutingModule { }