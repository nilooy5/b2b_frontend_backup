import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBreadcrumbComponent } from './vehicle-breadcrumb.component';

describe('VehicleBreadcrumbComponent', () => {
  let component: VehicleBreadcrumbComponent;
  let fixture: ComponentFixture<VehicleBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
