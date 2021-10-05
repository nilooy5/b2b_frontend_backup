import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAsSpSectionComponent } from './join-as-sp-section.component';

describe('JoinAsSpSectionComponent', () => {
  let component: JoinAsSpSectionComponent;
  let fixture: ComponentFixture<JoinAsSpSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinAsSpSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAsSpSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
