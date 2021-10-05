import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSettingsOthersEditComponent } from './leave-settings-others-edit.component';

describe('LeaveSettingsOthersEditComponent', () => {
  let component: LeaveSettingsOthersEditComponent;
  let fixture: ComponentFixture<LeaveSettingsOthersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSettingsOthersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSettingsOthersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
