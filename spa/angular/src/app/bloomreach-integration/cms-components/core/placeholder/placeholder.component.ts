import { Component, Input } from '@angular/core';

import { BaseComponent } from '../base-component/base-component.interface';

@Component({
  selector: 'cms-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements BaseComponent {
  @Input() configuration: any;
  @Input() content: any;

}
