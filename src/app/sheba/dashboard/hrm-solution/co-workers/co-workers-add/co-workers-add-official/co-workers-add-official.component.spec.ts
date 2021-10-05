import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersAddOfficialComponent } from './co-workers-add-official.component';

describe('CoWorkersAddOfficialComponent', () => {
  let component: CoWorkersAddOfficialComponent;
  let fixture: ComponentFixture<CoWorkersAddOfficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersAddOfficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersAddOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
