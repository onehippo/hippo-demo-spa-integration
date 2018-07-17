import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cms-component',
  templateUrl: './cms-component.component.html',
  styleUrls: ['./cms-component.component.css']
})
export class CmsComponentComponent implements OnChanges {
  components: any;
  @Input() configuration;

  constructor() {}

  ngOnChanges(): void {
    if (this.configuration && this.configuration.components) {
      this.components = this.configuration.components;
    }
  }
}
