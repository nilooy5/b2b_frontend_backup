import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderAddPriceComponent } from './procurement-tender-add-price.component';

describe('ProcurementTenderAddPriceComponent', () => {
  let component: ProcurementTenderAddPriceComponent;
  let fixture: ComponentFixture<ProcurementTenderAddPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderAddPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderAddPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
