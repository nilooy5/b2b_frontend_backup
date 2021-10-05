import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSettingsHolidayBreadcrumbComponent } from './office-settings-holiday-breadcrumb.component';

describe('OfficeSettingsHolidayBreadcrumbComponent', () => {
  let component: OfficeSettingsHolidayBreadcrumbComponent;
  let fixture: ComponentFixture<OfficeSettingsHolidayBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSettingsHolidayBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSettingsHolidayBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
