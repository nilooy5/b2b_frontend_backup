import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSettingsAttendanceEditComponent } from './office-settings-attendance-edit.component';

describe('OfficeSettingsAttendanceEditComponent', () => {
  let component: OfficeSettingsAttendanceEditComponent;
  let fixture: ComponentFixture<OfficeSettingsAttendanceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSettingsAttendanceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSettingsAttendanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
