import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestMemberCardComponent } from './purchase-request-member-card.component';

describe('PurchaseRequestMemberCardComponent', () => {
  let component: PurchaseRequestMemberCardComponent;
  let fixture: ComponentFixture<PurchaseRequestMemberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestMemberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestMemberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
