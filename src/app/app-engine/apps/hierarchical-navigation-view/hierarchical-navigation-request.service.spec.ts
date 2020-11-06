import { TestBed, inject } from '@angular/core/testing';

import { HierarchicalNavigationRequestService } from './hierarchical-navigation-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HierarchicalNavigationRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HierarchicalNavigationRequestService],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([HierarchicalNavigationRequestService], (service: HierarchicalNavigationRequestService) => {
    expect(service).toBeTruthy();
  }));
});
