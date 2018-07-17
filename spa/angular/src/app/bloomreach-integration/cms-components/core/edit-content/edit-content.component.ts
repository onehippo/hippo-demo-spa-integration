import { Component, ElementRef, Input, OnInit } from '@angular/core';

import getNestedObject from '../../../utils/nested-object';

@Component({
  selector: 'cms-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {
  @Input() metaData: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const nodeSpan = getNestedObject(this.metaData, ['beginNodeSpan', 0, 'data']);
    this.addComment(nodeSpan);
  }

  addComment(nodeSpan) {
    try {
      this.elementRef.nativeElement.innerHTML = `${nodeSpan}`;
    } catch(e) {
      console.log(`Error creating HTML comment: ${e}, for data: ${nodeSpan}`);
    }
  }
}
