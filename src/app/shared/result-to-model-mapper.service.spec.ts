import { TestBed, inject } from '@angular/core/testing';

import { ResultToModelMapperService } from './result-to-model-mapper.service';

describe('ResultToModelMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultToModelMapperService]
    });
  });

  it('should be created', inject([ResultToModelMapperService], (service: ResultToModelMapperService) => {
    expect(service).toBeTruthy();
  }));
});
