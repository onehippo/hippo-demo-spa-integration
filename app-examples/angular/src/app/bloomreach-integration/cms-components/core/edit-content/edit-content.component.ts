import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {
  @Input() cmsData: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    if (this.cmsData && this.cmsData.start) {
      this.addComment(this.cmsData.start);
    }
  }

  addComment(cmsData) {
    try {
      const cmsDataString = JSON.stringify(cmsData);
      this.elementRef.nativeElement.innerHTML = `<!-- ${cmsDataString} -->`;
    } catch(e) {
      console.log(`Error creating HTML comment: ${e}, for data: ${cmsData}`);
    }
  }
}
