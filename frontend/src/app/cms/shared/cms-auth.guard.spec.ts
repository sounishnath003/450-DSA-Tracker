import { TestBed } from '@angular/core/testing';

import { CmsAuthGuard } from './cms-auth.guard';

describe('CmsAuthGuard', () => {
  let guard: CmsAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CmsAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
