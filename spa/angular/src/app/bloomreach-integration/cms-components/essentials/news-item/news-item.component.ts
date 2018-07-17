import { Component, Input, OnInit } from '@angular/core';

import { ContentService } from '../../../content.service';

@Component({
  selector: 'cms-essentials-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  @Input() contentRef: any;
  content: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.getContent(this.contentRef);
  }

  getContent(contentRef) {
    if (contentRef && contentRef.$ref) {
      this.content = this.contentService.getContentViaReference(contentRef.$ref);
    }
  }
}
