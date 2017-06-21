import { CampuseventmanageformComponent } from './campuseventmanageform/campuseventmanageform.component';
import { CampusphotosmanageformComponent, } from './campusphotosmanageform/campusphotosmanageform.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampuseventmanageComponent } from './campuseventmanage/campuseventmanage.component';
import { CampusphotosmanageComponent } from './campusphotosmanage/campusphotosmanage.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';

const routes: Routes = [
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


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
