import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersDetailsOfficialComponent } from './co-workers-details-official.component';

describe('CoWorkersDetailsOfficialComponent', () => {
  let component: CoWorkersDetailsOfficialComponent;
  let fixture: ComponentFixture<CoWorkersDetailsOfficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersDetailsOfficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersDetailsOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
