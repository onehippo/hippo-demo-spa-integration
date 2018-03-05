import { ElementRef } from '@angular/core';

export abstract class CmsMetaDataComponent {

  constructor(protected elementRef: ElementRef) { }

  addComment(cmsData, position) {
    try {
      this.elementRef.nativeElement.insertAdjacentHTML(position, `<!-- ${cmsData} -->`)
    } catch(e) {
      console.log(`Error creating HTML comment: ${e}, for data: ${cmsData}`);
    }
  }
}
