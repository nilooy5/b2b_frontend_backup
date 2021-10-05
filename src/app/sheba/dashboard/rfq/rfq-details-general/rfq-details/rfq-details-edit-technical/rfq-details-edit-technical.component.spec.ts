import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqDetailsEditTechnicalComponent } from './rfq-details-edit-technical.component';

describe('RfqDetailsEditTechnicalComponent', () => {
  let component: RfqDetailsEditTechnicalComponent;
  let fixture: ComponentFixture<RfqDetailsEditTechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqDetailsEditTechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqDetailsEditTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
