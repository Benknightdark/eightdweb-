import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { CampuseventComponent } from './campusevent/campusevent.component';
import { CampuseventmanageComponent } from './campuseventmanage/campuseventmanage.component';
import { CampusphotosmanageComponent } from './campusphotosmanage/campusphotosmanage.component';
import { AccountGuard } from './guard/account.guard';
import { CampusphotosmanageformComponent } from "./campusphotosmanageform/campusphotosmanageform.component";
import { CampuseventmanageformComponent } from './campuseventmanageform/campuseventmanageform.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin', component: AdminlayoutComponent, children: [
      {
        path: 'campuseventmanage', component: CampuseventmanageComponent
      },
      {
        path: 'campusphotosmanage', component: CampusphotosmanageComponent
      },
      {
        path: 'campusphotosmanageform/create', component: CampusphotosmanageformComponent
      },
      {
        path: 'campusphotosmanageform/detail/:id', component: CampusphotosmanageformComponent
      },
      {
        path: 'campusphotosmanageform/edit/:id', component: CampusphotosmanageformComponent
      },
        {
        path: 'campuseventmanageform/create', component: CampuseventmanageformComponent
      },
      {
        path: 'campuseventmanageform/detail/:id', component: CampuseventmanageformComponent
      },
      {
        path: 'campuseventmanageform/edit/:id', component: CampuseventmanageformComponent
      }


    ], canActivate: [AccountGuard]
  },
  {
    path: "**", redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
