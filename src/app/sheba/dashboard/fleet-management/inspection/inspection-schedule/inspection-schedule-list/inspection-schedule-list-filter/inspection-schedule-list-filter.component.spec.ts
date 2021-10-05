import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionScheduleListFilterComponent } from './inspection-schedule-list-filter.component';

describe('InspectionScheduleListFilterComponent', () => {
  let component: InspectionScheduleListFilterComponent;
  let fixture: ComponentFixture<InspectionScheduleListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionScheduleListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionScheduleListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
