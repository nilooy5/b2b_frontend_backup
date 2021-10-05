import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsModalComponent } from './service-details-modal.component';

describe('ServiceDetailsModalComponent', () => {
  let component: ServiceDetailsModalComponent;
  let fixture: ComponentFixture<ServiceDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
