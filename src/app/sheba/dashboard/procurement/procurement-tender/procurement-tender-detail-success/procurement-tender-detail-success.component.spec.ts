import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderDetailSuccessComponent } from './procurement-tender-detail-success.component';

describe('ProcurementTenderDetailSuccessComponent', () => {
  let component: ProcurementTenderDetailSuccessComponent;
  let fixture: ComponentFixture<ProcurementTenderDetailSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderDetailSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderDetailSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
