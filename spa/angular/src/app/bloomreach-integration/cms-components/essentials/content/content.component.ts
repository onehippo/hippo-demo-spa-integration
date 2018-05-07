import { Component } from '@angular/core';

import { BaseComponent } from '../../core/base-component/base-component.interface';
import { ContentComponentWrapper } from '../../core/content-component/content-component.component';
import { ContentService } from '../../../content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent extends ContentComponentWrapper implements BaseComponent {

  constructor(contentService: ContentService) {
    super(contentService);
  }
}
