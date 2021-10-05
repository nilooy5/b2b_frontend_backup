import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderDetailBidTabComponent } from './procurement-tender-detail-bid-tab.component';

describe('ProcurementTenderDetailBidTabComponent', () => {
  let component: ProcurementTenderDetailBidTabComponent;
  let fixture: ComponentFixture<ProcurementTenderDetailBidTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderDetailBidTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderDetailBidTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
