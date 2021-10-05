import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPurchaseCartComponent } from './quick-purchase-cart.component';

describe('QuickPurchaseCartComponent', () => {
  let component: QuickPurchaseCartComponent;
  let fixture: ComponentFixture<QuickPurchaseCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPurchaseCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPurchaseCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
