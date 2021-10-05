import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestFormsComponent } from './purchase-request-forms.component';

describe('PurchaseRequestFormsComponent', () => {
  let component: PurchaseRequestFormsComponent;
  let fixture: ComponentFixture<PurchaseRequestFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
