import { NgModule } from '@angular/core';

import { AuthModule } from "./auth/auth.module";

import { ApiService } from './api.service';
import { ExceptionService } from './exception.service';
import { UserService } from './user.service';
import { JwtService } from './jwt.service';
import { Token } from '@angular/compiler';

@NgModule({
  imports: [
    AuthModule
  ],
  declarations: [],
  providers: [
    ApiService,
    ExceptionService,
    UserService,
    JwtService
  ]
})
export class CoreModule { }