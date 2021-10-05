import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderParticipateProposalComponent } from './tender-participate-proposal.component';

describe('TenderParticipateProposalComponent', () => {
  let component: TenderParticipateProposalComponent;
  let fixture: ComponentFixture<TenderParticipateProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderParticipateProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderParticipateProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
