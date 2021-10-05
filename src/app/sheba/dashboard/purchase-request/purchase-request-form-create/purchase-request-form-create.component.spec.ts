import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestFormCreateComponent } from './purchase-request-form-create.component';

describe('PurchaseRequestFormCreateComponent', () => {
  let component: PurchaseRequestFormCreateComponent;
  let fixture: ComponentFixture<PurchaseRequestFormCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestFormCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
