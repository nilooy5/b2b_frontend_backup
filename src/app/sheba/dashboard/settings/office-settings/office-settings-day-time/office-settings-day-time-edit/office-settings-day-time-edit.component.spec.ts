import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSettingsDayTimeEditComponent } from './office-settings-day-time-edit.component';

describe('OfficeSettingsDayTimeEditComponent', () => {
  let component: OfficeSettingsDayTimeEditComponent;
  let fixture: ComponentFixture<OfficeSettingsDayTimeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSettingsDayTimeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSettingsDayTimeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
