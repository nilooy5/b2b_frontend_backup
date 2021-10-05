import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsDetailsComponent } from './announcements-details.component';

describe('AnnouncementsDetailsComponent', () => {
  let component: AnnouncementsDetailsComponent;
  let fixture: ComponentFixture<AnnouncementsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
