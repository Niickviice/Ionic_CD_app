import { TestBed } from '@angular/core/testing';

import { TokenGuardiaService } from './token-guardia.service';

describe('TokenGuardiaService', () => {
  let service: TokenGuardiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenGuardiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
