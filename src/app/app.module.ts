import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampuseventComponent } from './campusevent/campusevent.component';
import { CampusphotosComponent } from './campusphotos/campusphotos.component';

@NgModule({
  declarations: [
    AppComponent,
    CampuseventComponent,
    CampusphotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
