import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { NoAuthGuardService } from './no-auth-guard.service';
import { SharedModule, AlertService } from '../../shared';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule,
    FormsModule, ReactiveFormsModule 
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    AuthService,
    AlertService,
    NoAuthGuardService
  ]
})
export class AuthModule { }
