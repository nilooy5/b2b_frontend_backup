import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersAddEmergencyComponent } from './co-workers-add-emergency.component';

describe('CoWorkersAddEmergencyComponent', () => {
  let component: CoWorkersAddEmergencyComponent;
  let fixture: ComponentFixture<CoWorkersAddEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersAddEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersAddEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
