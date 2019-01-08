import { TestBed, inject } from '@angular/core/testing';

import { GetPageAndMappingAndOpenAppFromUrlService } from './get-page-and-mapping-and-open-app-from-url.service';

describe('GetPageAndMappingAndOpenAppFromUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPageAndMappingAndOpenAppFromUrlService]
    });
  });

  it('should be created', inject([GetPageAndMappingAndOpenAppFromUrlService], (service: GetPageAndMappingAndOpenAppFromUrlService) => {
    expect(service).toBeTruthy();
  }));
});
