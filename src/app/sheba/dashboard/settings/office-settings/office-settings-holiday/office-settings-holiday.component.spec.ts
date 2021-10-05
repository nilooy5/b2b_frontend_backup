import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSettingsHolidayComponent } from './office-settings-holiday.component';

describe('OfficeSettingsHolidayComponent', () => {
  let component: OfficeSettingsHolidayComponent;
  let fixture: ComponentFixture<OfficeSettingsHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSettingsHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSettingsHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
