import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderAddAdditionalComponent } from './procurement-tender-add-additional.component';

describe('ProcurementTenderAddAdditionalComponent', () => {
  let component: ProcurementTenderAddAdditionalComponent;
  let fixture: ComponentFixture<ProcurementTenderAddAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderAddAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderAddAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
