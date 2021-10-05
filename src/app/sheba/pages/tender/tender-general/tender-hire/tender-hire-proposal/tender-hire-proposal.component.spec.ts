import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderHireProposalComponent } from './tender-hire-proposal.component';

describe('TenderHireProposalComponent', () => {
  let component: TenderHireProposalComponent;
  let fixture: ComponentFixture<TenderHireProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderHireProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderHireProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
