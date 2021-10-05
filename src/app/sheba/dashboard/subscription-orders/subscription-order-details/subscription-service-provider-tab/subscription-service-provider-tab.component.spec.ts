import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionServiceProviderTabComponent } from './subscription-service-provider-tab.component';

describe('SubscriptionServiceProviderTabComponent', () => {
  let component: SubscriptionServiceProviderTabComponent;
  let fixture: ComponentFixture<SubscriptionServiceProviderTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionServiceProviderTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionServiceProviderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
