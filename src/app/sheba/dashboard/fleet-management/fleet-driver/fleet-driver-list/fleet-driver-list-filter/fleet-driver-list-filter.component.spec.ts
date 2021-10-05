import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetDriverListFilterComponent } from './fleet-driver-list-filter.component';

describe('FleetDriverListFilterComponent', () => {
  let component: FleetDriverListFilterComponent;
  let fixture: ComponentFixture<FleetDriverListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetDriverListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetDriverListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
