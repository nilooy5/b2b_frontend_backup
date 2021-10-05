import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersDetailsHeaderComponent } from './co-workers-details-header.component';

describe('CoWorkersDetailsHeaderComponent', () => {
  let component: CoWorkersDetailsHeaderComponent;
  let fixture: ComponentFixture<CoWorkersDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersDetailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
