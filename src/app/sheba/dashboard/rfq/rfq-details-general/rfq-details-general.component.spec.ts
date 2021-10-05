import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqDetailsGeneralComponent } from './rfq-details-general.component';

describe('RfqDetailsGeneralComponent', () => {
  let component: RfqDetailsGeneralComponent;
  let fixture: ComponentFixture<RfqDetailsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqDetailsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqDetailsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
