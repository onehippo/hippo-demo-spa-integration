import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { CmsMetaDataComponent } from '../cms-meta-data/cms-meta-data.component';
import { ContentService } from '../../../content.service';
import getNestedObject from '../../../utils/nested-object';

@Component({
  selector: 'cms-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent extends CmsMetaDataComponent implements OnInit {
  @Input() configuration;
  components: any;

  constructor(
    private contentService: ContentService,
    elementRef: ElementRef
  ) { super(elementRef); }

  ngOnInit(): void {
    if (this.configuration && this.configuration.components) {
      this.components = this.configuration.components;
    }
    this.addComments();
  }

  addComments(): void {
    const beginNodeSpan = getNestedObject(this.configuration, ['_meta', 'beginNodeSpan', 0, 'data']);
    if (beginNodeSpan) {
      this.addComment(beginNodeSpan, "afterbegin");
    }
    const endNodeSpan = getNestedObject(this.configuration, ['_meta', 'endNodeSpan', 0, 'data']);
    if (endNodeSpan) {
      this.addComment(endNodeSpan, "beforeend");
    }
  }
}
