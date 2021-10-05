import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqDetailsShowAdvancedComponent } from './rfq-details-show-advanced.component';

describe('RfqDetailsShowAdvancedComponent', () => {
  let component: RfqDetailsShowAdvancedComponent;
  let fixture: ComponentFixture<RfqDetailsShowAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqDetailsShowAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqDetailsShowAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
