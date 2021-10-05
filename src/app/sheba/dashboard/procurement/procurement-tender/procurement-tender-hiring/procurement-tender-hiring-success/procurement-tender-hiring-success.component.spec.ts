import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderHiringSuccessComponent } from './procurement-tender-hiring-success.component';

describe('ProcurementTenderHiringSuccessComponent', () => {
  let component: ProcurementTenderHiringSuccessComponent;
  let fixture: ComponentFixture<ProcurementTenderHiringSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderHiringSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderHiringSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
