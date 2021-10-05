import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersWorkorderComponent } from './rfq-orders-workorder.component';

describe('RfqOrdersWorkorderComponent', () => {
  let component: RfqOrdersWorkorderComponent;
  let fixture: ComponentFixture<RfqOrdersWorkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersWorkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
