import { AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ContentService } from '../../../content.service';
import { cmsJavascriptInitialization } from '../../../utils/cms-js-overrides';
import { findChildById } from '../../../utils/find-child-by-id';
import {ActivatedRoute} from "@angular/router";
import { BloomreachContext } from '../../../types/bloomreach-context.type';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, AfterViewInit {
  pageData: any;
  containers: any;
  bloomreachContext: BloomreachContext;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.setBloomreachContext();
    this.getContainers();
  }

  ngAfterViewInit() {
    // quick fix for parsing HTML comments after load; need to hook into proper on-load event
    setTimeout(() => {
      cmsJavascriptInitialization(window, this);
      },
      500);
  }

  setBloomreachContext() {
    this.route.data.subscribe(context => {
      this.bloomreachContext = context as BloomreachContext;
      this.contentService.setBloomreachContext(this.bloomreachContext);
    });
    this.route.url.subscribe(segments => {
      const url = segments.join('/');
      this.bloomreachContext.pathInfo = url;
      this.contentService.setBloomreachContext(this.bloomreachContext);
    });
  }

  getContainers() {
    this.contentService.getPage()
      .subscribe(pageData => {
        this.pageData = pageData;
        if (pageData.containers) {
          this.containers = pageData.containers;
        }
      });
  }

  updateComponent(component, propertiesMap): void {
    // only update when a component changes, when propertiesMap is empty the user has clicked cancel in component settings
    // refresh in that case as an easy workaround
    if (Object.keys(propertiesMap).length === 0) {
      window.location.reload();
    } else {
      if (component && component.metaData && component.metaData.refNS) {
        const componentId = component.metaData.refNS;
        this.contentService.updateComponent(componentId, propertiesMap).subscribe(componentResponse => {
          this.updateComponents(componentId, componentResponse);
          this.changeDetectorRef.detectChanges();
        });
      }
    }
  }

  private updateComponents(componentId, componentResponse) {
    // find the component that needs to be updated in the page structure object using its ID
    const componentToUpdate = findChildById(this.containers, componentId, null, null);
    // API can return empty response when component is deleted
    if (componentResponse && componentToUpdate !== undefined) {
      // API can return either a single component or single container
      if (componentResponse.component) {
        componentToUpdate.parent[componentToUpdate.idx] = componentResponse.component;
      }
    }
  }

}
