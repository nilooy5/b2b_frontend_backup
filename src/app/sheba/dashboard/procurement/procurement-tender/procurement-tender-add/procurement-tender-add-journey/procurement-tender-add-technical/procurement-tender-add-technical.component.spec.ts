import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderAddTechnicalComponent } from './procurement-tender-add-technical.component';

describe('ProcurementTenderAddTechnicalComponent', () => {
  let component: ProcurementTenderAddTechnicalComponent;
  let fixture: ComponentFixture<ProcurementTenderAddTechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderAddTechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderAddTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
