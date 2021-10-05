import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderDetailComponent } from './procurement-tender-detail.component';

describe('ProcurementTenderDetailComponent', () => {
  let component: ProcurementTenderDetailComponent;
  let fixture: ComponentFixture<ProcurementTenderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
