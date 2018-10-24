import { TestBed, inject } from '@angular/core/testing';

import { SparqlRequestService } from './sparql-request.service';

describe('SparqlRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SparqlRequestService]
    });
  });

  it('should be created', inject([SparqlRequestService], (service: SparqlRequestService) => {
    expect(service).toBeTruthy();
  }));
});
