import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestFormSelectComponent } from './purchase-request-form-select.component';

describe('PurchaseRequestRejectNoteComponent', () => {
  let component: PurchaseRequestFormSelectComponent;
  let fixture: ComponentFixture<PurchaseRequestFormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestFormSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
