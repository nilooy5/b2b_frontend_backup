import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoWalkthrougComponent } from './video-walkthroug.component';

describe('VideoWalkthrougComponent', () => {
  let component: VideoWalkthrougComponent;
  let fixture: ComponentFixture<VideoWalkthrougComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoWalkthrougComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoWalkthrougComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
