import {inject, TestBed} from '@angular/core/testing';

import {SynopsisObjectSerializerService} from './synopsis-object-serializer.service';
import {SynopsisObjectStorageService} from './synopsis-object-storage.service';
import { LightTableLayoutService } from './light-table-layout.service';

describe('SynopsisObjectSerializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LightTableLayoutService,
        SynopsisObjectSerializerService,
        SynopsisObjectStorageService
      ]
    });
  });

  it('should be created', inject([SynopsisObjectSerializerService], (service: SynopsisObjectSerializerService) => {
    expect(service).toBeTruthy();
  }));
});
