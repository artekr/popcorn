import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { ProfileModule } from './profile/profile.module';
import { TagsModule } from './tags/tags.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    ProfileModule,
    TagsModule,
    AppRoutingModule
  ],
  providers: [],
  exports:[BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
