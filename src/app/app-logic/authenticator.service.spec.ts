import { TestBed } from '@angular/core/testing';

import { Authenticator } from './authenticator.service';

describe('AuthenticatorService', () => {
  let service: Authenticator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authenticator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
