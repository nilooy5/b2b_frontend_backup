import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSettingsTypeComponent } from './leave-settings-type.component';

describe('LeaveSettingsTypeComponent', () => {
  let component: LeaveSettingsTypeComponent;
  let fixture: ComponentFixture<LeaveSettingsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSettingsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSettingsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
