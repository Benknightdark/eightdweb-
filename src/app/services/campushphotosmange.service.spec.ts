import { TestBed, inject } from '@angular/core/testing';

import { CampushphotosmangeService } from './campushphotosmange.service';

describe('CampushphotosmangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampushphotosmangeService]
    });
  });

  it('should be created', inject([CampushphotosmangeService], (service: CampushphotosmangeService) => {
    expect(service).toBeTruthy();
  }));
});
