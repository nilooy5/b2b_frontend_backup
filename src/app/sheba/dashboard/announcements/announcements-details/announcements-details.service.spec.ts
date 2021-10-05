import { TestBed } from '@angular/core/testing';

import { AnnouncementsDetailsService } from './announcements-details.service';

describe('AnnouncementsDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnouncementsDetailsService = TestBed.get(AnnouncementsDetailsService);
    expect(service).toBeTruthy();
  });
});
