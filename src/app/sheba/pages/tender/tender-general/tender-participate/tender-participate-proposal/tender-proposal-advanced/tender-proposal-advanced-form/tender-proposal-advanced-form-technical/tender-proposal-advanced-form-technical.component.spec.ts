import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalAdvancedFormTechnicalComponent } from './tender-proposal-advanced-form-technical.component';

describe('TenderProposalAdvancedFormTechnicalComponent', () => {
  let component: TenderProposalAdvancedFormTechnicalComponent;
  let fixture: ComponentFixture<TenderProposalAdvancedFormTechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalAdvancedFormTechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalAdvancedFormTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
