import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderAddGeneralComponent } from './procurement-tender-add-general.component';

describe('ProcurementTenderAddGeneralComponent', () => {
  let component: ProcurementTenderAddGeneralComponent;
  let fixture: ComponentFixture<ProcurementTenderAddGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderAddGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderAddGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
