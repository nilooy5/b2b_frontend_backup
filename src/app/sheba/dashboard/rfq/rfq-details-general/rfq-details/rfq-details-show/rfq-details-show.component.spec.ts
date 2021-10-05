import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqDetailsShowComponent } from './rfq-details-show.component';

describe('RfqDetailsShowComponent', () => {
  let component: RfqDetailsShowComponent;
  let fixture: ComponentFixture<RfqDetailsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqDetailsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqDetailsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
