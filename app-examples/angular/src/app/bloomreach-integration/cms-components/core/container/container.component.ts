import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ContentService } from '../../../content.service';
import { CmsMetaDataComponent } from '../cms-meta-data/cms-meta-data.component';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent extends CmsMetaDataComponent implements OnInit {
  @Input() container;
  components: any;
  cmsData = {};

  constructor(
    private contentService: ContentService,
    elementRef: ElementRef
  ) { super(elementRef); }

  ngOnInit(): void {
    this.components = this.container.components;
    this.addComments();
  }

  addComments(): void {
    if (this.container.cmsData && this.container.cmsData.start && this.container.cmsData.end) {
      const cmsDataStart = JSON.stringify(this.container.cmsData.start);
      this.addComment(cmsDataStart, "afterbegin");
      const cmsDataEnd = JSON.stringify(this.container.cmsData.end);
      this.addComment(cmsDataEnd, "beforeend");
    }
  }
}
