import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../../core/base-component/base-component.interface';
import { ContentComponentWrapper } from '../../core/content-component/content-component.component';
import { ContentService } from '../../../content.service';

@Component({
  selector: 'cms-essentials-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent extends ContentComponentWrapper implements BaseComponent, OnInit {
  imageUrl: string;

  constructor(contentService: ContentService) {
    super(contentService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.imageUrl = super.getImageUrl();
  }
}
