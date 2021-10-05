import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionFailedItemListFilterComponent } from './fleet-inspection-failed-item-list-filter.component';

describe('FleetInspectionFailedItemListFilterComponent', () => {
  let component: FleetInspectionFailedItemListFilterComponent;
  let fixture: ComponentFixture<FleetInspectionFailedItemListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionFailedItemListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionFailedItemListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
