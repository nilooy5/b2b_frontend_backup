import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMonthlyListFilterComponent } from './attendance-monthly-list-filter.component';

describe('AttendanceMonthlyListFilterComponent', () => {
  let component: AttendanceMonthlyListFilterComponent;
  let fixture: ComponentFixture<AttendanceMonthlyListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceMonthlyListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceMonthlyListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
