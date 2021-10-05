import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderHiringRequestComponent } from './procurement-tender-hiring-request.component';

describe('ProcurementTenderHiringRequestComponent', () => {
  let component: ProcurementTenderHiringRequestComponent;
  let fixture: ComponentFixture<ProcurementTenderHiringRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderHiringRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderHiringRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
