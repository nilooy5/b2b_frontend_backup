import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalAttachmentComponent } from './tender-proposal-attachment.component';

describe('TenderProposalAttachmentComponent', () => {
  let component: TenderProposalAttachmentComponent;
  let fixture: ComponentFixture<TenderProposalAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
