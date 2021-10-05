import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalAdvancedComponent } from './tender-proposal-advanced.component';

describe('TenderProposalAdvancedComponent', () => {
  let component: TenderProposalAdvancedComponent;
  let fixture: ComponentFixture<TenderProposalAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
