import { TestBed } from '@angular/core/testing';

import { AngularPasswordStrengthAnalyzerService } from './angular-password-strength-analyzer.service';

describe('AngularPasswordStrengthAnalyzerService', () => {
  let service: AngularPasswordStrengthAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularPasswordStrengthAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
