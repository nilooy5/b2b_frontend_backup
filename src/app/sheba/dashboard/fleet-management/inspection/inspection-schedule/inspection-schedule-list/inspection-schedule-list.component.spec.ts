import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionScheduleListComponent } from './inspection-schedule-list.component';

describe('InspectionScheduleListComponent', () => {
  let component: InspectionScheduleListComponent;
  let fixture: ComponentFixture<InspectionScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
