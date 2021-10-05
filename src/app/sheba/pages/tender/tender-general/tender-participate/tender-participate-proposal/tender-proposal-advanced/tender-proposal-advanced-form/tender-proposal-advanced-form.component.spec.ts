import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalAdvancedFormComponent } from './tender-proposal-advanced-form.component';

describe('TenderProposalAdvancedFormComponent', () => {
  let component: TenderProposalAdvancedFormComponent;
  let fixture: ComponentFixture<TenderProposalAdvancedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalAdvancedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalAdvancedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
