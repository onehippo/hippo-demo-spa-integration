import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './bloomreach-integration/cms-components/core/page/page.component';
import { BloomreachContext } from './bloomreach-integration/types/bloomreach-context.type';
import baseUrls from './bloomreach-integration/utils/cms-urls';

const routes: Routes = [
  {
    path: baseUrls.cmsContextPath,
    children: [
      {
        path: baseUrls.cmsPreviewPrefix,
        children: [
          {
            path: '**',
            component: PageComponent,
            data: { contextPath: baseUrls.cmsContextPath, preview: baseUrls.cmsPreviewPrefix }
            // data: new BloomreachContext('site', true, ''),
          }
        ]
      },
      {
        path: '**',
        component: PageComponent,
        data: { contextPath: baseUrls.cmsContextPath }
        // data: new BloomreachContext('site', false, ''),
      }
    ]
  },
  {
    path: baseUrls.cmsPreviewPrefix,
    children: [
      {
        path: '**',
        component: PageComponent,
        data: { preview: baseUrls.cmsPreviewPrefix }
        // data: new BloomreachContext('', true, ''),
      }
    ]
  },
  {
    path: '**',
    component: PageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
