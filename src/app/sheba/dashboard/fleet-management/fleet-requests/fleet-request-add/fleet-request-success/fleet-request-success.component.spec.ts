import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetRequestSuccessComponent } from './fleet-request-success.component';

describe('FleetRequestSuccessComponent', () => {
  let component: FleetRequestSuccessComponent;
  let fixture: ComponentFixture<FleetRequestSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetRequestSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetRequestSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
