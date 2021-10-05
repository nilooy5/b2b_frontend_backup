import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSettingsTypeBreadcrumbComponent } from './leave-settings-type-breadcrumb.component';

describe('LeaveSettingsTypeBreadcrumbComponent', () => {
  let component: LeaveSettingsTypeBreadcrumbComponent;
  let fixture: ComponentFixture<LeaveSettingsTypeBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSettingsTypeBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSettingsTypeBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
