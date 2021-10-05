import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoVendorFoundComponent } from './no-vendor-found.component';

describe('NoVendorFoundComponent', () => {
  let component: NoVendorFoundComponent;
  let fixture: ComponentFixture<NoVendorFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoVendorFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoVendorFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
