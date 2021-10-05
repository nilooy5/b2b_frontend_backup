import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderAddSuccessComponent } from './procurement-tender-add-success.component';

describe('ProcurementTenderAddSuccessComponent', () => {
  let component: ProcurementTenderAddSuccessComponent;
  let fixture: ComponentFixture<ProcurementTenderAddSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderAddSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderAddSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
