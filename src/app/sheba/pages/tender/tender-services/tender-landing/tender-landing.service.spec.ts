import { TestBed } from '@angular/core/testing';

import { TenderLandingService } from './tender-landing.service';

describe('TenderLandingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TenderLandingService = TestBed.get(TenderLandingService);
    expect(service).toBeTruthy();
  });
});
