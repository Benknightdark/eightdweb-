
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampuseventComponent } from './campusevent/campusevent.component';
import { CampusphotosComponent } from './campusphotos/campusphotos.component';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { LoginComponent } from './login/login.component';
import { AccountService } from './services/account.service';
import { AccountGuard } from './guard/account.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CampuseventComponent,
    CampusphotosComponent,
    LayoutComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,

  ],
  providers: [AccountService, AccountGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
