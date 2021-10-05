import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqDetailsEditCompanyComponent } from './rfq-details-edit-company.component';

describe('RfqDetailsEditCompanyComponent', () => {
  let component: RfqDetailsEditCompanyComponent;
  let fixture: ComponentFixture<RfqDetailsEditCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqDetailsEditCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqDetailsEditCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
