import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalAdvancedFormInfoComponent } from './tender-proposal-advanced-form-info.component';

describe('TenderProposalAdvancedFormInfoComponent', () => {
  let component: TenderProposalAdvancedFormInfoComponent;
  let fixture: ComponentFixture<TenderProposalAdvancedFormInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalAdvancedFormInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalAdvancedFormInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
