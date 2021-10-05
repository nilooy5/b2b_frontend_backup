import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqQuotationComponent } from './rfq-quotation.component';

describe('RfqQuotationComponent', () => {
  let component: RfqQuotationComponent;
  let fixture: ComponentFixture<RfqQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
