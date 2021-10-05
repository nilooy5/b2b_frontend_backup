import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionOngoingDetailsScheduleComponent } from './fleet-inspection-ongoing-details-schedule.component';

describe('FleetInspectionOngoingDetailsScheduleComponent', () => {
  let component: FleetInspectionOngoingDetailsScheduleComponent;
  let fixture: ComponentFixture<FleetInspectionOngoingDetailsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionOngoingDetailsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionOngoingDetailsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
