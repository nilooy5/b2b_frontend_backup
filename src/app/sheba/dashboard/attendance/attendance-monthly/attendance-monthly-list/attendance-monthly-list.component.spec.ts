import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMonthlyListComponent } from './attendance-monthly-list.component';

describe('AttendanceMonthlyListComponent', () => {
  let component: AttendanceMonthlyListComponent;
  let fixture: ComponentFixture<AttendanceMonthlyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceMonthlyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceMonthlyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
