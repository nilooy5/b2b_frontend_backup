import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDailyListFilterComponent } from './attendance-daily-list-filter.component';

describe('AttendanceDailyListFilterComponent', () => {
  let component: AttendanceDailyListFilterComponent;
  let fixture: ComponentFixture<AttendanceDailyListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceDailyListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceDailyListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
