import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSettingsEditComponent } from './sms-settings-edit.component';

describe('SmsSettingsEditComponent', () => {
  let component: SmsSettingsEditComponent;
  let fixture: ComponentFixture<SmsSettingsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsSettingsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
