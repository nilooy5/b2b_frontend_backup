import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestApprovalComponent } from './purchase-request-approval.component';

describe('PurchaseRequestRejectNoteComponent', () => {
  let component: PurchaseRequestApprovalComponent;
  let fixture: ComponentFixture<PurchaseRequestApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
