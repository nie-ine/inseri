import { TestBed, inject } from '@angular/core/testing';

import { ResultToEditionMapperService } from './result-to-edition-mapper.service';

describe('ResultToEditionMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultToEditionMapperService]
    });
  });

  it('should be created', inject([ResultToEditionMapperService], (service: ResultToEditionMapperService) => {
    expect(service).toBeTruthy();
  }));
});
