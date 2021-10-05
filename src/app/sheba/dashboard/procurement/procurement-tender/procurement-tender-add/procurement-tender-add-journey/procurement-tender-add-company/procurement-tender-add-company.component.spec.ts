import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderAddCompanyComponent } from './procurement-tender-add-company.component';

describe('ProcurementTenderAddCompanyComponent', () => {
  let component: ProcurementTenderAddCompanyComponent;
  let fixture: ComponentFixture<ProcurementTenderAddCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderAddCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderAddCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
