import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverImageEditComponent } from './driver-image-edit.component';

describe('DriverImageEditComponent', () => {
  let component: DriverImageEditComponent;
  let fixture: ComponentFixture<DriverImageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverImageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
