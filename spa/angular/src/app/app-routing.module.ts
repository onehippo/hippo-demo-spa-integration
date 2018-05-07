import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './bloomreach-integration/cms-components/core/page/page.component';
import { BloomreachContext } from './bloomreach-integration/types/bloomreach-context.type';

const routes: Routes = [
  {
    path: 'site',
    children: [
      {
        path: '_cmsinternal',
        children: [
          {
            path: '**',
            component: PageComponent,
            data: { contextPath: 'site', preview: true }
            // data: new BloomreachContext('site', true, ''),
          }
        ]
      },
      {
        path: '**',
        component: PageComponent,
        data: { contextPath: 'site' }
        // data: new BloomreachContext('site', false, ''),
      }
    ]
  },
  {
    path: '_cmsinternal',
    children: [
      {
        path: '**',
        component: PageComponent,
        data: { preview: true }
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
