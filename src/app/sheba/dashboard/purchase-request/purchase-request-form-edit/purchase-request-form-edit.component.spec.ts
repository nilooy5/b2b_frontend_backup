import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestFormEditComponent } from './purchase-request-form-edit.component';

describe('PurchaseRequestFormCreateComponent', () => {
  let component: PurchaseRequestFormEditComponent;
  let fixture: ComponentFixture<PurchaseRequestFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
