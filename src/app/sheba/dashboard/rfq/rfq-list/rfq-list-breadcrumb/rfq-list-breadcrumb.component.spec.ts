import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqListBreadcrumbComponent } from './rfq-list-breadcrumb.component';

describe('RfqListBreadcrumbComponent', () => {
  let component: RfqListBreadcrumbComponent;
  let fixture: ComponentFixture<RfqListBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqListBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqListBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
