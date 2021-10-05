import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersDetailsGeneralComponent } from './rfq-orders-details-general.component';

describe('RfqOrdersDetailsGeneralComponent', () => {
  let component: RfqOrdersDetailsGeneralComponent;
  let fixture: ComponentFixture<RfqOrdersDetailsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersDetailsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersDetailsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
