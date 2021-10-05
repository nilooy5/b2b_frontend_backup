import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersDetailsBasicComponent } from './co-workers-details-basic.component';

describe('CoWorkersDetailsBasicComponent', () => {
  let component: CoWorkersDetailsBasicComponent;
  let fixture: ComponentFixture<CoWorkersDetailsBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersDetailsBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersDetailsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
