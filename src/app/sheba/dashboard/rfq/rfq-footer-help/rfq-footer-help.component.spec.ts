import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqFooterHelpComponent } from './rfq-footer-help.component';

describe('RfqFooterHelpComponent', () => {
  let component: RfqFooterHelpComponent;
  let fixture: ComponentFixture<RfqFooterHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqFooterHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqFooterHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
