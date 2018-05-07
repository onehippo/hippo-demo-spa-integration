import { Component, Input, OnInit } from '@angular/core';

import { ContentService } from '../../../content.service';
import { baseUrls } from '../../../env-vars';

@Component({
  selector: 'app-content-component',
  templateUrl: './content-component.component.html',
  styleUrls: ['./content-component.component.css']
})
export class ContentComponentWrapper implements OnInit {
  @Input() component: any;
  content: any;
  image: string;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.getContent();
    this.getImageUrl();
  }

  getContent() {
    if (this.component && this.component.attributes && this.component.attributes.document) {
      const contentUuid = this.component.attributes.document;
      this.content = this.contentService.getContentItem(contentUuid);
    }
  }

  getImageUrl() {
    if (this.content && this.content.document && this.content.document.image && this.content.document.image.handlePath) {
      this.image = baseUrls.cmsBaseImageUrl + this.content.document.image.handlePath;
    }
  }

}
