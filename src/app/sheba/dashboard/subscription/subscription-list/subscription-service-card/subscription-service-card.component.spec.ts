import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionServiceCardComponent } from './subscription-service-card.component';

describe('SubscriptionServiceCardComponent', () => {
  let component: SubscriptionServiceCardComponent;
  let fixture: ComponentFixture<SubscriptionServiceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionServiceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
