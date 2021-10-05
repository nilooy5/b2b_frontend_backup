import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureProcurementPostComponent } from './feature-procurement-post.component';

describe('FeatureProcurementPostComponent', () => {
  let component: FeatureProcurementPostComponent;
  let fixture: ComponentFixture<FeatureProcurementPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureProcurementPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureProcurementPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
