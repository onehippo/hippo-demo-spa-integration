import { Component, Input, OnInit } from '@angular/core';

import { ContentService } from '../../../content.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  @Input() contentUuid: any;
  content: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.getContent(this.contentUuid);
  }

  getContent(contentUuid) {
    this.content = this.contentService.getContentItem(contentUuid);
  }
}
