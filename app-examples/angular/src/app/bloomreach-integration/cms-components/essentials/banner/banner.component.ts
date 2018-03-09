import { Component } from '@angular/core';

import { BaseComponent } from '../../core/base-component/base-component.interface';
import { ContentComponentWrapper } from '../../core/content-component/content-component.component';
import { ContentService } from "../../../content.service";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent extends ContentComponentWrapper implements BaseComponent {

  constructor(contentService: ContentService) {
    super(contentService);
  }
}
