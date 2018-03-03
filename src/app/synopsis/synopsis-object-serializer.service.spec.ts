import { TestBed, inject } from '@angular/core/testing';

import { SynopsisObjectSerializerService } from './synopsis-object-serializer.service';

describe('SynopsisObjectSerializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynopsisObjectSerializerService]
    });
  });

  it('should be created', inject([SynopsisObjectSerializerService], (service: SynopsisObjectSerializerService) => {
    expect(service).toBeTruthy();
  }));
});
