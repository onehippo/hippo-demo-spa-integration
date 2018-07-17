import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

import 'rxjs/add/operator/map';

import { ContentService } from '../../../content.service';
import { BloomreachContext } from '../../../types/bloomreach-context.type';
import addBodyComments from '../../../utils/add-html-comment';

@Component({
  selector: 'cms-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  pageModel: any;
  bloomreachContext: BloomreachContext;
  cms: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.initializeCmsIntegration();
    this.setBloomreachContext();
    this.fetchPageModel();
    // fetch Page Model API when navigated to a PageComponent
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.initializeCmsIntegration();
          this.setBloomreachContext();
          this.fetchPageModel();
        }
      });
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

  fetchPageModel() {
    this.contentService.fetchPageModel()
      .subscribe(data => {
        if (data.page) {
          this.pageModel = data.page;
          addBodyComments(this.pageModel, this.bloomreachContext.preview);
          if (this.cms) {
            this.cms.createOverlay();
          }
        }
      });
  }

  updateComponent(componentId, propertiesMap): void {
    // only update when a component changes, when propertiesMap is empty the user has clicked cancel in component settings
    // refresh in that case as an easy workaround
    // if (Object.keys(propertiesMap).length === 0) {
    //   window.location.reload();
    // } else {
      if (componentId) {
        this.contentService.updateComponent(componentId, propertiesMap).subscribe(pageModel => {
          if (pageModel) {
            this.pageModel = pageModel;
            if (this.cms) {
              this.cms.createOverlay();
            }
            if (!this.changeDetectorRef['destroyed']) {
              this.changeDetectorRef.detectChanges();
            }
          }
        });
      }
    // }
  }

  private initializeCmsIntegration() {
    const windowSPAPreloaded = (typeof window !== 'undefined' && typeof (<any>window).SPA !== 'undefined');

    if (!windowSPAPreloaded) {
      (<any>window).SPA = {
        init: (cms) => {
          this.cms = cms;
          if(this.pageModel) {
            this.cms.createOverlay();
          }
        },
        renderComponent: (id, propertiesMap) => {
          this.updateComponent(id, propertiesMap);
        }
      };
    }
  }
}
