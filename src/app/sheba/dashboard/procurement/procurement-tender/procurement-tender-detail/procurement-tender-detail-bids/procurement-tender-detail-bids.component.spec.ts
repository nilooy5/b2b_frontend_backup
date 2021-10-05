import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderDetailBidsComponent } from './procurement-tender-detail-bids.component';

describe('ProcurementTenderDetailBidsComponent', () => {
  let component: ProcurementTenderDetailBidsComponent;
  let fixture: ComponentFixture<ProcurementTenderDetailBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderDetailBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderDetailBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
