import { Component, Input, OnInit } from '@angular/core';

import { ContentService } from '../../../content.service';
import getImageUrl from "../../../utils/image-url";
import getNestedObject from '../../../utils/nested-object';

@Component({
  selector: 'cms-content-component',
  templateUrl: './content-component.component.html',
  styleUrls: ['./content-component.component.css']
})
export class ContentComponentWrapper implements OnInit {
  @Input() configuration: any;
  content: any;

  constructor(protected contentService: ContentService) {}

  ngOnInit() {
    this.getContent();
  }

  getContent() {
    const contentRef = getNestedObject(this.configuration, ['models', 'document', '$ref']);
    if (contentRef) {
      this.content = this.contentService.getContentViaReference(contentRef);
    }
  }

  getImageUrl() {
    if (this.content && this.content.image) {
      const pageModel = this.contentService.getPageModel();
      return getImageUrl(this.content.image, pageModel);
    }
  }
}
