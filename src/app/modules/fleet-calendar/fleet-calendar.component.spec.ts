import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetCalendarComponent } from './fleet-calendar.component';

describe('FleetCalendarComponent', () => {
  let component: FleetCalendarComponent;
  let fixture: ComponentFixture<FleetCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
