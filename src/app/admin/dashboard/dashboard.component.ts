import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import {DynamiccomponentDirective} from '../../shared/directives/dynamiccomponent.directive'
import { DynamicchartService } from '../../services/dynamicchart.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
@ViewChild(DynamiccomponentDirective) componentHost: DynamiccomponentDirective;
  constructor(private dynamicComponentService: DynamicchartService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
   this.displayComponent("LadarchartComponent")
  }
   displayComponent(componentName: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.dynamicComponentService.getComponent(componentName));
    const viewContainerRef = this.componentHost.viewContainerRef;

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
