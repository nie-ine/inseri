import { TestBed, inject } from '@angular/core/testing';

import { LightTableStashService } from './light-table-stash.service';

describe('LightTableStashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LightTableStashService]
    });
  });

  it('should be created', inject([LightTableStashService], (service: LightTableStashService) => {
    expect(service).toBeTruthy();
  }));
});
