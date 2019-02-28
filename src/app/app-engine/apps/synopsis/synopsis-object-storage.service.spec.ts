import { TestBed, inject } from '@angular/core/testing';

import { SynopsisObjectStorageService } from './synopsis-object-storage.service';

describe('SynopsisObjectStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynopsisObjectStorageService]
    });
  });

  it('should be created', inject([SynopsisObjectStorageService], (service: SynopsisObjectStorageService) => {
    expect(service).toBeTruthy();
  }));
});
