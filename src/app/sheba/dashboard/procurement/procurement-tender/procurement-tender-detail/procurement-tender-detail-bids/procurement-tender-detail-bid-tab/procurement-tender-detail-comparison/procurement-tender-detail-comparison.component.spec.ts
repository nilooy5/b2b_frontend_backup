import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderDetailComparisonComponent } from './procurement-tender-detail-comparison.component';

describe('ProcurementTenderDetailComparisonComponent', () => {
  let component: ProcurementTenderDetailComparisonComponent;
  let fixture: ComponentFixture<ProcurementTenderDetailComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderDetailComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderDetailComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
