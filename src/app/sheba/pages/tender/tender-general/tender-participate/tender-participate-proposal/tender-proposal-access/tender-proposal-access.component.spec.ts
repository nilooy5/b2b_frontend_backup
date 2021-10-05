import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalAccessComponent } from './tender-proposal-access.component';

describe('TenderProposalAccessComponent', () => {
  let component: TenderProposalAccessComponent;
  let fixture: ComponentFixture<TenderProposalAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
