import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCartItemComponent } from './service-cart-item.component';

describe('ServiceCartItemComponent', () => {
  let component: ServiceCartItemComponent;
  let fixture: ComponentFixture<ServiceCartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
