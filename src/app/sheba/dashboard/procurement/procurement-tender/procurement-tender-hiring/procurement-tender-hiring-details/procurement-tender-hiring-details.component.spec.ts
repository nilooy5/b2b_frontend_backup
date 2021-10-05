import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderHiringDetailsComponent } from './procurement-tender-hiring-details.component';

describe('ProcurementTenderHiringDetailsComponent', () => {
  let component: ProcurementTenderHiringDetailsComponent;
  let fixture: ComponentFixture<ProcurementTenderHiringDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderHiringDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderHiringDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
