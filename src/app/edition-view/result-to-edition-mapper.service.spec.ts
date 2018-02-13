import { TestBed, inject } from '@angular/core/testing';

import { ResultToEditionMapperService } from './result-to-edition-mapper.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ResultToEditionMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultToEditionMapperService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([ResultToEditionMapperService], (service: ResultToEditionMapperService) => {
    expect(service).toBeTruthy();
  }));
});
