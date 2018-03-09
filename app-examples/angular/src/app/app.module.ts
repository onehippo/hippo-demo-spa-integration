import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContentService } from './bloomreach-integration/content.service';
import { ContainerComponent } from './bloomreach-integration/cms-components/core/container/container.component';
import { BaseComponentComponent } from './bloomreach-integration/cms-components/core/base-component/base-component.component';
import { BaseComponentDirective } from './bloomreach-integration/cms-components/core/base-component/base-component.directive';
import { ContentComponentWrapper } from './bloomreach-integration/cms-components/core/content-component/content-component.component';
import { ComponentDefinitionsService } from "./bloomreach-integration/component-definitions.service";
import { BannerComponent } from './bloomreach-integration/cms-components/essentials/banner/banner.component';
import { UndefinedComponent } from './bloomreach-integration/cms-components/core/undefined/undefined.component';
import { PageComponent } from './bloomreach-integration/cms-components/core/page/page.component';
import { NewsListComponent } from './bloomreach-integration/cms-components/essentials/news-list/news-list.component';
import { NewsItemComponent } from './bloomreach-integration/cms-components/essentials/news-item/news-item.component';
import { ContentComponent } from './bloomreach-integration/cms-components/essentials/content/content.component';
import { EditContentComponent } from './bloomreach-integration/cms-components/core/edit-content/edit-content.component';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ContainerComponent,
    BaseComponentComponent,
    BaseComponentDirective,
    ContentComponentWrapper,
    UndefinedComponent,
    BannerComponent,
    ContentComponent,
    NewsListComponent,
    NewsItemComponent,
    EditContentComponent,
  ],
  entryComponents: [ UndefinedComponent, BannerComponent, ContentComponent, NewsListComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ContentService, ComponentDefinitionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
