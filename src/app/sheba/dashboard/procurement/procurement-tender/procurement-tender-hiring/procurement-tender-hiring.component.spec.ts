import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderHiringComponent } from './procurement-tender-hiring.component';

describe('ProcurementTenderHiringComponent', () => {
  let component: ProcurementTenderHiringComponent;
  let fixture: ComponentFixture<ProcurementTenderHiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderHiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
