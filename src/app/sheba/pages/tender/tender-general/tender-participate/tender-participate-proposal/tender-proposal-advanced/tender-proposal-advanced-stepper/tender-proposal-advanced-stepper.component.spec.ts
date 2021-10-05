import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalAdvancedStepperComponent } from './tender-proposal-advanced-stepper.component';

describe('TenderProposalAdvancedStepperComponent', () => {
  let component: TenderProposalAdvancedStepperComponent;
  let fixture: ComponentFixture<TenderProposalAdvancedStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalAdvancedStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalAdvancedStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
