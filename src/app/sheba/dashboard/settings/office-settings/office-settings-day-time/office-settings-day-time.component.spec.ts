import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSettingsDayTimeComponent } from './office-settings-day-time.component';

describe('OfficeSettingsDayTimeComponent', () => {
  let component: OfficeSettingsDayTimeComponent;
  let fixture: ComponentFixture<OfficeSettingsDayTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSettingsDayTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSettingsDayTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
