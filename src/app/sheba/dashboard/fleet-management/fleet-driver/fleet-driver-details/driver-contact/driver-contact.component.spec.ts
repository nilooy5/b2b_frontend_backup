import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverContactComponent } from './driver-contact.component';

describe('DriverContactComponent', () => {
  let component: DriverContactComponent;
  let fixture: ComponentFixture<DriverContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
