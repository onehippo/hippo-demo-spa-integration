import { Component, Input, OnInit } from '@angular/core';

import { BaseComponent } from '../../core/base-component/base-component.interface';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements BaseComponent, OnInit {
  @Input() component: any;
  @Input() content: any;
  items: any;

  constructor() { }

  ngOnInit() {
    this.createList();
  }

  createList() {
    if (this.component && this.component.attributes && this.component.attributes.pageable
      && this.component.attributes.pageable.items) {
      this.items = this.component.attributes.pageable.items;
    }
  }
}
