import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqBiddingsComponent } from './rfq-biddings.component';

describe('RfqBiddingsComponent', () => {
  let component: RfqBiddingsComponent;
  let fixture: ComponentFixture<RfqBiddingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqBiddingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqBiddingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
