import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProposalBasicComponent } from './tender-proposal-basic.component';

describe('TenderProposalBasicComponent', () => {
  let component: TenderProposalBasicComponent;
  let fixture: ComponentFixture<TenderProposalBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProposalBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProposalBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
