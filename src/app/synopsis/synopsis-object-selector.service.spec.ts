import { TestBed, inject } from '@angular/core/testing';

import { SynopsisObjectSelectorService } from './synopsis-object-selector.service';

describe('SynopsisObjectSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynopsisObjectSelectorService]
    });
  });

  it('should be created', inject([SynopsisObjectSelectorService], (service: SynopsisObjectSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
