import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersAddBasicComponent } from './co-workers-add-basic.component';

describe('CoWorkersAddBasicComponent', () => {
  let component: CoWorkersAddBasicComponent;
  let fixture: ComponentFixture<CoWorkersAddBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersAddBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersAddBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
