import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderAddComponent } from './procurement-tender-add.component';

describe('ProcurementTenderAddComponent', () => {
  let component: ProcurementTenderAddComponent;
  let fixture: ComponentFixture<ProcurementTenderAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
