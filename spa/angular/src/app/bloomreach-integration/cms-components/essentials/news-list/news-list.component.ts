import { Component, Input, OnInit } from '@angular/core';

import { BaseComponent } from '../../core/base-component/base-component.interface';
import getNestedObject from '../../../utils/nested-object';

@Component({
  selector: 'cms-essentials-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements BaseComponent, OnInit {
  @Input() configuration: any;
  @Input() content: any;
  items: any;

  constructor() { }

  ngOnInit() {
    this.createList();
  }

  createList() {
    this.items = getNestedObject(this.configuration, ['models', 'pageable', 'items']);
  }
}
