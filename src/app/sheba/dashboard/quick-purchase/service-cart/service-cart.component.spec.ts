import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCartComponent } from './service-cart.component';

describe('ServiceCartComponent', () => {
  let component: ServiceCartComponent;
  let fixture: ComponentFixture<ServiceCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
