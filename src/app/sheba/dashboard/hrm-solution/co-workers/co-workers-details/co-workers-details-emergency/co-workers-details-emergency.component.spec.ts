import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersDetailsEmergencyComponent } from './co-workers-details-emergency.component';

describe('CoWorkersDetailsEmergencyComponent', () => {
  let component: CoWorkersDetailsEmergencyComponent;
  let fixture: ComponentFixture<CoWorkersDetailsEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersDetailsEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersDetailsEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
