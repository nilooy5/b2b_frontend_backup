import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetRequestListFilterComponent } from './fleet-request-list-filter.component';

describe('FleetRequestListFilterComponent', () => {
  let component: FleetRequestListFilterComponent;
  let fixture: ComponentFixture<FleetRequestListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetRequestListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetRequestListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
