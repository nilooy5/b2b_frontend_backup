import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionScheduleComponent } from './inspection-schedule.component';

describe('InspectionScheduleComponent', () => {
  let component: InspectionScheduleComponent;
  let fixture: ComponentFixture<InspectionScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
