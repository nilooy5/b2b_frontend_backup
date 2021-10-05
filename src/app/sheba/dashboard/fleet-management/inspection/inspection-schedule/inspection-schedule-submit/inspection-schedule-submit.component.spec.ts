import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionScheduleSubmitComponent } from './inspection-schedule-submit.component';

describe('InspectionScheduleSubmitComponent', () => {
  let component: InspectionScheduleSubmitComponent;
  let fixture: ComponentFixture<InspectionScheduleSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionScheduleSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionScheduleSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
