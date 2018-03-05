import { Component, Input } from '@angular/core';

import { BaseComponent } from '../base-component/base-component.interface';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements BaseComponent {
  @Input() component: any;
  @Input() content: any;

}
