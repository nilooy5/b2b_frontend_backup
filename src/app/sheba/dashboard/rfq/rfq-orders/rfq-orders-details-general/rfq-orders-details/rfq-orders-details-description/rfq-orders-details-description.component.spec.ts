import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersDetailsDescriptionComponent } from './rfq-orders-details-description.component';

describe('RfqOrdersDetailsDescriptionComponent', () => {
  let component: RfqOrdersDetailsDescriptionComponent;
  let fixture: ComponentFixture<RfqOrdersDetailsDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersDetailsDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersDetailsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
