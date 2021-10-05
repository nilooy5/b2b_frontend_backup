import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalVerificationComponent } from './tender-proposal-verification.component';

describe('TenderProposalVerificationComponent', () => {
  let component: TenderProposalVerificationComponent;
  let fixture: ComponentFixture<TenderProposalVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
