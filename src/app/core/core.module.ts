import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './api.service';
import { ExceptionService } from './exception.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    ApiService,
    ExceptionService
  ]
})
export class CoreModule { }
