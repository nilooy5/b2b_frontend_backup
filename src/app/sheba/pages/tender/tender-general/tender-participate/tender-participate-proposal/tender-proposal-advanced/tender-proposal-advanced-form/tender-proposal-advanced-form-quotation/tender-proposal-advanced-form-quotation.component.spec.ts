import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalAdvancedFormQuotationComponent } from './tender-proposal-advanced-form-quotation.component';

describe('TenderProposalAdvancedFormQuotationComponent', () => {
  let component: TenderProposalAdvancedFormQuotationComponent;
  let fixture: ComponentFixture<TenderProposalAdvancedFormQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalAdvancedFormQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalAdvancedFormQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
