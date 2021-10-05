import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionScheduleComponent } from './subscription-schedule.component';

describe('SubscriptionScheduleComponent', () => {
  let component: SubscriptionScheduleComponent;
  let fixture: ComponentFixture<SubscriptionScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
