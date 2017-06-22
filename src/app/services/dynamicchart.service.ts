import { Injectable } from '@angular/core';
import {BarchartComponent} from '../admin/barchart/barchart.component'
import {PiechartComponent} from '../admin/piechart/piechart.component'
import {LadarchartComponent} from '../admin/ladarchart/ladarchart.component'
@Injectable()
export class DynamicchartService {
 private components = {
    PiechartComponent: PiechartComponent,
    LadarchartComponent: LadarchartComponent,
    BarchartComponent: BarchartComponent
  }
  constructor() { }
   getComponent(componentName) {
    return this.components[componentName];
  }

}
