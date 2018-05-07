import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[base-component]',
})
export class BaseComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
