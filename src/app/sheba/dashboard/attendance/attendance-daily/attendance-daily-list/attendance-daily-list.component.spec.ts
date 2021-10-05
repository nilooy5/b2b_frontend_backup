import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDailyListComponent } from './attendance-daily-list.component';

describe('AttendanceDailyListComponent', () => {
  let component: AttendanceDailyListComponent;
  let fixture: ComponentFixture<AttendanceDailyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceDailyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceDailyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
