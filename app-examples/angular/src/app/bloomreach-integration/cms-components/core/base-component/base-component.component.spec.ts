import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponentComponent } from './base-component.component';

describe('BaseComponentComponent', () => {
  let component: BaseComponentComponent;
  let fixture: ComponentFixture<BaseComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
