import { TestBed, inject } from '@angular/core/testing';

import { ResultToTextMapperService } from './result-to-text-mapper.service';

describe('ResultToTextMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultToTextMapperService]
    });
  });

  it('should be created', inject([ResultToTextMapperService], (service: ResultToTextMapperService) => {
    expect(service).toBeTruthy();
  }));
});
