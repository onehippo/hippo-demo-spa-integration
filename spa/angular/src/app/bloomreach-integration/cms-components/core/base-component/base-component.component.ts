import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from './base-component.interface';
import { BaseComponentDirective } from './base-component.directive';
import { CmsMetaDataComponent } from '../cms-meta-data/cms-meta-data.component';
import { UndefinedComponent } from '../undefined/undefined.component';
import { ComponentDefinitionsService } from '../../../component-definitions.service';
import { ContentService } from '../../../content.service';
import getNestedObject from '../../../utils/nested-object';

@Component({
  selector: 'cms-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.css']
})
export class BaseComponentComponent extends CmsMetaDataComponent implements OnInit {
  @Input() configuration: any;
  @ViewChild(BaseComponentDirective) baseComponent: BaseComponentDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentDefinitionsService: ComponentDefinitionsService,
    private contentService: ContentService,
    elementRef: ElementRef)
  {
    super(elementRef);
  }

  ngOnInit() {
    this.createComponent();
  }

  createComponent() {
    if (this.configuration && this.configuration.label) {
      let cmsComponent = this.componentDefinitionsService.getComponent(this.configuration.label);
      if (!cmsComponent) {
        cmsComponent = UndefinedComponent;
      }

      // CMS meta-data
      const beginNodeSpan = getNestedObject(this.configuration, ['_meta', 'beginNodeSpan', 0, 'data']);
      if (beginNodeSpan) {
        this.addComment(beginNodeSpan, "beforebegin");
      }
      const endNodeSpan = getNestedObject(this.configuration, ['_meta', 'endNodeSpan', 0, 'data']);
      if (endNodeSpan) {
        this.addComment(endNodeSpan, "afterend");
      }

      // create component
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(cmsComponent);
      let viewContainerRef = this.baseComponent.viewContainerRef;
      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<BaseComponent>componentRef.instance).configuration = this.configuration;
    }
  }

}
