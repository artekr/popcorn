import { NgModule } from '@angular/core';

import { AuthModule } from "./auth/auth.module";

import { ApiService } from './api.service';
import { ExceptionService } from './exception.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    AuthModule
  ],
  declarations: [],
  providers: [
    ApiService,
    ExceptionService,
    UserService
  ]
})
export class CoreModule { }