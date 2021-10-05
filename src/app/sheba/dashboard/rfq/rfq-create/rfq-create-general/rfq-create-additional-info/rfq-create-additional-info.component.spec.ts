import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateAdditionalInfoComponent } from './rfq-create-additional-info.component';

describe('RfqCreateAdditionalInfoComponent', () => {
  let component: RfqCreateAdditionalInfoComponent;
  let fixture: ComponentFixture<RfqCreateAdditionalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateAdditionalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
