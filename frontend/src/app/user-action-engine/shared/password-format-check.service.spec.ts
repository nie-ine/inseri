import { TestBed, inject } from '@angular/core/testing';

import { PasswordFormatCheckService } from './password-format-check.service';

describe('PasswordFormatCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordFormatCheckService]
    });
  });

  it('should be created', inject([PasswordFormatCheckService], (service: PasswordFormatCheckService) => {
    expect(service).toBeTruthy();
  }));
});
