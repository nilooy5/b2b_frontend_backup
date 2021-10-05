import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSettingsOthersComponent } from './leave-settings-others.component';

describe('LeaveSettingsOthersComponent', () => {
  let component: LeaveSettingsOthersComponent;
  let fixture: ComponentFixture<LeaveSettingsOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSettingsOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSettingsOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
