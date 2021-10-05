import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateComponent } from './rfq-create.component';

describe('RfqCreateComponent', () => {
  let component: RfqCreateComponent;
  let fixture: ComponentFixture<RfqCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
