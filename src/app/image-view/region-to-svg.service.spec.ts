import { TestBed, inject } from '@angular/core/testing';

import { RegionToSvgService } from './region-to-svg.service';

describe('RegionToSvgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionToSvgService]
    });
  });

  it('should be created', inject([RegionToSvgService], (service: RegionToSvgService) => {
    expect(service).toBeTruthy();
  }));
});
