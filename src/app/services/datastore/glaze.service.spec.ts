import { TestBed } from '@angular/core/testing';

import { GlazeService } from './glaze.service';

describe('GlazeService', () => {
  let service: GlazeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlazeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
