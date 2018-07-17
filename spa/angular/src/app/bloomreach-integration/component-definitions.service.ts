import { Injectable } from '@angular/core';

import { BannerComponent } from './cms-components/essentials/banner/banner.component';
import { ContentComponent } from './cms-components/essentials/content/content.component';
import { NewsListComponent } from './cms-components/essentials/news-list/news-list.component';

const componentDefinitions = {
  "Banner": BannerComponent,
  "Content": ContentComponent,
  "News List": NewsListComponent,
}

@Injectable()
export class ComponentDefinitionsService {
  getComponentDefinitions() {
    return componentDefinitions;
  }

  getComponent(type) {
    if (type in componentDefinitions) {
      return componentDefinitions[type];
    } else {
      return false;
    }
  }
}
