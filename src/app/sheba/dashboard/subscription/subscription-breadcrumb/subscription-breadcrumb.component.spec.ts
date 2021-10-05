import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBreadcrumbComponent } from './subscription-breadcrumb.component';

describe('SubscriptionBreadcrumbComponent', () => {
  let component: SubscriptionBreadcrumbComponent;
  let fixture: ComponentFixture<SubscriptionBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
