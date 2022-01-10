import { TestBed, inject } from '@angular/core/testing';

import { LightTableLayoutService } from './light-table-layout.service';

describe('LightTableLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LightTableLayoutService]
    });
  });

  it('should be created', inject([LightTableLayoutService], (service: LightTableLayoutService) => {
    expect(service).toBeTruthy();
  }));
});
