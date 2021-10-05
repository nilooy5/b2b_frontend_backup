import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsApprovalComponent } from './settings-approval.component';

describe('SettingsApprovalComponent', () => {
  let component: SettingsApprovalComponent;
  let fixture: ComponentFixture<SettingsApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
