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
import { ImageUploadModule } from 'angular2-image-upload';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { LoginComponent } from './login/login.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { CampuseventmanageComponent } from './campuseventmanage/campuseventmanage.component';
import { CampusphotosmanageComponent } from './campusphotosmanage/campusphotosmanage.component';
import { AccountService } from './services/account.service';
import { AccountComponent } from './guard/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    CampuseventComponent,
    CampusphotosComponent,
    LayoutComponent,
    LoginComponent,
    AdminlayoutComponent,
    CampuseventmanageComponent,
    CampusphotosmanageComponent,
    AccountComponent,

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
    ImageUploadModule.forRoot()
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
