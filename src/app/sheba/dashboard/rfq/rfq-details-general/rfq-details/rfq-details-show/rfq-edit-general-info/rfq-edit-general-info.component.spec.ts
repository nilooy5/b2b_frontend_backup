import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqEditGeneralInfoComponent } from './rfq-edit-general-info.component';

describe('RfqEditGeneralInfoComponent', () => {
  let component: RfqEditGeneralInfoComponent;
  let fixture: ComponentFixture<RfqEditGeneralInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqEditGeneralInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqEditGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
