import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestFormDetailComponent } from './purchase-request-form-detail.component';

describe('PurchaseRequestFormDetailComponent', () => {
  let component: PurchaseRequestFormDetailComponent;
  let fixture: ComponentFixture<PurchaseRequestFormDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestFormDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
