import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsMetaDataComponent } from './cms-meta-data.component';

describe('CmsMetaDataComponent', () => {
  let component: CmsMetaDataComponent;
  let fixture: ComponentFixture<CmsMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsMetaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
