import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionTimeComponent } from './subscription-time.component';

describe('SubscriptionTimeComponent', () => {
  let component: SubscriptionTimeComponent;
  let fixture: ComponentFixture<SubscriptionTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
