import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateBasicInfoComponent } from './rfq-create-basic-info.component';

describe('RfqCreateBasicInfoComponent', () => {
  let component: RfqCreateBasicInfoComponent;
  let fixture: ComponentFixture<RfqCreateBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
