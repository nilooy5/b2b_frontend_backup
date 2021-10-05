import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersListEmptyComponent } from './rfq-orders-list-empty.component';

describe('RfqOrdersListEmptyComponent', () => {
  let component: RfqOrdersListEmptyComponent;
  let fixture: ComponentFixture<RfqOrdersListEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersListEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersListEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
