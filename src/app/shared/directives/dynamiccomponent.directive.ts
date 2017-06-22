import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamiccomponent]'
})
export class DynamiccomponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
