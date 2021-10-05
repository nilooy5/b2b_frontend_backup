import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersDetailsComponent } from './rfq-orders-details.component';

describe('RfqOrdersDetailsComponent', () => {
  let component: RfqOrdersDetailsComponent;
  let fixture: ComponentFixture<RfqOrdersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
