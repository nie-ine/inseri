import { TestBed } from '@angular/core/testing';

import { HierarchicalNavigationRequestService } from './hierarchical-navigation-request.service';

describe('HierarchicalNavigationRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HierarchicalNavigationRequestService = TestBed.get(HierarchicalNavigationRequestService);
    expect(service).toBeTruthy();
  });
});
