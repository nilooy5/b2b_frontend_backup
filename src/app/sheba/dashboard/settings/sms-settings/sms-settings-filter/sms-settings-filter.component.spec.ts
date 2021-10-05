import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSettingsFilterComponent } from './sms-settings-filter.component';

describe('SmsSettingsFilterComponent', () => {
  let component: SmsSettingsFilterComponent;
  let fixture: ComponentFixture<SmsSettingsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsSettingsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSettingsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
