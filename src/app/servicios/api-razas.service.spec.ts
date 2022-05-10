import { TestBed } from '@angular/core/testing';

import { ApiRazasService } from './api-razas.service';

describe('ApiRazasService', () => {
  let service: ApiRazasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRazasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
