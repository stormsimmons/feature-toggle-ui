import { TestBed, async, inject } from '@angular/core/testing';

import { OpenIDGuard } from './open-id.guard';

describe('OpenIDGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenIDGuard]
    });
  });

  it('should ...', inject([OpenIDGuard], (guard: OpenIDGuard) => {
    expect(guard).toBeTruthy();
  }));
});
