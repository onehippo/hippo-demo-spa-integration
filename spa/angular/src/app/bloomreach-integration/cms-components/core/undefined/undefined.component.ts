import { Component, Input } from '@angular/core';

import { BaseComponent } from '../base-component/base-component.interface';

@Component({
  selector: 'cms-undefined',
  templateUrl: './undefined.component.html',
  styleUrls: ['./undefined.component.css']
})
export class UndefinedComponent implements BaseComponent {
  @Input() configuration: any;
  @Input() content: any;

}
