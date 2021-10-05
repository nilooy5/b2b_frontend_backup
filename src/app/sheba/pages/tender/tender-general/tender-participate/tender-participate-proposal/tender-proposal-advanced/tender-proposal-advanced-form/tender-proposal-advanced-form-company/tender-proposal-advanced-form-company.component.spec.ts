import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalAdvancedFormCompanyComponent } from './tender-proposal-advanced-form-company.component';

describe('TenderProposalAdvancedFormCompanyComponent', () => {
  let component: TenderProposalAdvancedFormCompanyComponent;
  let fixture: ComponentFixture<TenderProposalAdvancedFormCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalAdvancedFormCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalAdvancedFormCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
