import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigigoWhyChooseUsComponent } from './digigo-why-choose-us.component';

describe('DigigoWhyChooseUsComponent', () => {
  let component: DigigoWhyChooseUsComponent;
  let fixture: ComponentFixture<DigigoWhyChooseUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigigoWhyChooseUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigigoWhyChooseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
