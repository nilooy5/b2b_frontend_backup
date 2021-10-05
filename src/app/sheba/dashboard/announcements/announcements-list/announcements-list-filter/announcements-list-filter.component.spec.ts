import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsListFilterComponent } from './announcements-list-filter.component';

describe('AnnouncementsListFilterComponent', () => {
  let component: AnnouncementsListFilterComponent;
  let fixture: ComponentFixture<AnnouncementsListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementsListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
