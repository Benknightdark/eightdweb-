import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import {DynamiccomponentDirective} from '../../shared/directives/dynamiccomponent.directive'
import { DynamicchartService } from '../../services/dynamicchart.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
@ViewChild(DynamiccomponentDirective) componentHost: DynamiccomponentDirective;
 components =[]
 ShowAllCharts:boolean=true;
ScreenWidth

  constructor(private dynamicComponentService: DynamicchartService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
        this.ScreenWidth = document.documentElement.clientWidth;
    this.components=[
      {name:"全部",value:"all"},
      {
        name:"圓餅圖",
        value:"PiechartComponent"
      },
         {
        name:"雷達圖",
        value:"LadarchartComponent"
      },
           {
        name:"長條圖",
        value:"BarchartComponent"
      }
    ];
     $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: true // Stops event propagation
    }


  );
  // this.displayComponent("LadarchartComponent")
  Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .subscribe(data => {

        this.ScreenWidth = data
        console.log(this.ScreenWidth)

      });
  }
   displayComponent(item) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
    this.dynamicComponentService.getComponent(item.value));
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).title = item.name;
  }
    onSelectChart(item){
      if(item.value!="all"){
          this.ShowAllCharts=false;
          this.displayComponent(item)

      }else{
        this.ShowAllCharts=true;
        this.componentHost.viewContainerRef.clear()

      }
    }
}
