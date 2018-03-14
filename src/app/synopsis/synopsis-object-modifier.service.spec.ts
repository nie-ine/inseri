import { TestBed, inject } from '@angular/core/testing';

import { SynopsisObjectModifierService } from './synopsis-object-modifier.service';

describe('SynopsisObjectModifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynopsisObjectModifierService]
    });
  });

  it('should be created', inject([SynopsisObjectModifierService], (service: SynopsisObjectModifierService) => {
    expect(service).toBeTruthy();
  }));
});
