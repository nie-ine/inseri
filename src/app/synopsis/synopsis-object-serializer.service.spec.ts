import {inject, TestBed} from '@angular/core/testing';

import {SynopsisObjectSerializerService} from './synopsis-object-serializer.service';
import {SynopsisObjectStorageService} from './synopsis-object-storage.service';

describe('SynopsisObjectSerializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SynopsisObjectSerializerService,
        SynopsisObjectStorageService
      ]
    });
  });

  it('should be created', inject([SynopsisObjectSerializerService], (service: SynopsisObjectSerializerService) => {
    expect(service).toBeTruthy();
  }));
});
