import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersListComponent } from './rfq-orders-list.component';

describe('RfqOrdersListComponent', () => {
  let component: RfqOrdersListComponent;
  let fixture: ComponentFixture<RfqOrdersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
