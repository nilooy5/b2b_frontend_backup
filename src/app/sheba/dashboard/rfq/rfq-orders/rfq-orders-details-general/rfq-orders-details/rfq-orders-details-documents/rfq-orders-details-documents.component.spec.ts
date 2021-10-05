import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersDetailsDocumentsComponent } from './rfq-orders-details-documents.component';

describe('RfqOrdersDetailsDocumentsComponent', () => {
  let component: RfqOrdersDetailsDocumentsComponent;
  let fixture: ComponentFixture<RfqOrdersDetailsDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersDetailsDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersDetailsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
