import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from './base-component.interface';
import { BaseComponentDirective } from './base-component.directive';
import { ComponentDefinitionsService } from '../../../component-definitions.service';
import { UndefinedComponent } from '../undefined/undefined.component';
import { ContentService } from '../../../content.service';
import { CmsMetaDataComponent } from '../cms-meta-data/cms-meta-data.component';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.css']
})
export class BaseComponentComponent extends CmsMetaDataComponent implements OnInit {
  @Input() component: any;
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
    if (this.component && this.component.type) {
      let cmsComponent = this.componentDefinitionsService.getComponent(this.component.type);
      if (!cmsComponent) {
        cmsComponent = UndefinedComponent;
      }

      // CMS meta-data
      if (this.component.cmsData && this.component.cmsData.start && this.component.cmsData.end) {
        const cmsDataStart = JSON.stringify(this.component.cmsData.start);
        this.addComment(cmsDataStart, "beforebegin");
        const cmsDataEnd = JSON.stringify(this.component.cmsData.end);
        this.addComment(cmsDataEnd, "afterend");
      }

      // create component
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(cmsComponent);
      let viewContainerRef = this.baseComponent.viewContainerRef;
      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<BaseComponent>componentRef.instance).component = this.component;
    }
  }

}
