import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampusphotosmanageformComponent } from './campusphotosmanageform/campusphotosmanageform.component';
import { CampushphotosmanageService } from '../services/campushphotosmanage.service';
import { DynamicchartService } from '../services/dynamicchart.service';
import { CampuseventmanageformComponent } from './campuseventmanageform/campuseventmanageform.component';
import { CampuseventmanageService } from '../services/campuseventmanage.service';
import { CampuseventmanageComponent } from './campuseventmanage/campuseventmanage.component';
import { CampusphotosmanageComponent } from './campusphotosmanage/campusphotosmanage.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component'
import { AdminRoutingModule } from './admin-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PiechartComponent } from './piechart/piechart.component';
import { LadarchartComponent } from './ladarchart/ladarchart.component';
import { BarchartComponent } from './barchart/barchart.component';
import { DynamiccomponentDirective } from '../shared/directives/dynamiccomponent.directive';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ImageUploadModule.forRoot(),
    NgxDatatableModule,
    AdminRoutingModule,
    ChartsModule



  ],
  declarations: [
    AdminlayoutComponent,
    CampuseventmanageComponent,
    CampusphotosmanageComponent,
    CampusphotosmanageformComponent,
    CampuseventmanageformComponent,
    DashboardComponent,
     PiechartComponent,
    LadarchartComponent,
    BarchartComponent,
DynamiccomponentDirective

  ],
  entryComponents:[
 PiechartComponent,
    LadarchartComponent,
    BarchartComponent
    ],
  providers: [CampushphotosmanageService, CampuseventmanageService, DynamicchartService],
})
export class AdminModule { }
