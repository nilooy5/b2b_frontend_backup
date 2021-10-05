import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestFormCardComponent } from './purchase-request-form-card.component';

describe('PurchaseRequestMemberCardComponent', () => {
  let component: PurchaseRequestFormCardComponent;
  let fixture: ComponentFixture<PurchaseRequestFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
