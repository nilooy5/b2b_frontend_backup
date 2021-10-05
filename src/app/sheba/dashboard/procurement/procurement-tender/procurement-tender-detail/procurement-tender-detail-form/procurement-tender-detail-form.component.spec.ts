import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderDetailFormComponent } from './procurement-tender-detail-form.component';

describe('ProcurementTenderDetailFormComponent', () => {
  let component: ProcurementTenderDetailFormComponent;
  let fixture: ComponentFixture<ProcurementTenderDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
