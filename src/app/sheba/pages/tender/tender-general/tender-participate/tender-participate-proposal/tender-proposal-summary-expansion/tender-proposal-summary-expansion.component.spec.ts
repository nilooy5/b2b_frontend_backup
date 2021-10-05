import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalSummaryExpansionComponent } from './tender-proposal-summary-expansion.component';

describe('TenderProposalSummaryExpansionComponent', () => {
  let component: TenderProposalSummaryExpansionComponent;
  let fixture: ComponentFixture<TenderProposalSummaryExpansionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalSummaryExpansionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalSummaryExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
