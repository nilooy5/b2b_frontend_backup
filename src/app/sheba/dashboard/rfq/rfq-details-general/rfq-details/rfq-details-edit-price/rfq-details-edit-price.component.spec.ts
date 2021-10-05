import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqDetailsEditPriceComponent } from './rfq-details-edit-price.component';

describe('RfqDetailsEditPriceComponent', () => {
  let component: RfqDetailsEditPriceComponent;
  let fixture: ComponentFixture<RfqDetailsEditPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqDetailsEditPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqDetailsEditPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
