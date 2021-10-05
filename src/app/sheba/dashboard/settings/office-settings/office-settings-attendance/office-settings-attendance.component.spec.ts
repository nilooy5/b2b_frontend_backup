import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSettingsAttendanceComponent } from './office-settings-attendance.component';

describe('OfficeSettingsAttendanceComponent', () => {
  let component: OfficeSettingsAttendanceComponent;
  let fixture: ComponentFixture<OfficeSettingsAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSettingsAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSettingsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
