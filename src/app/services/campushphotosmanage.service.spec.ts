import { TestBed, inject } from '@angular/core/testing';

import { CampushphotosmanageService } from './campushphotosmanage.service';

describe('CampushphotosmanageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampushphotosmanageService]
    });
  });

  it('should be created', inject([CampushphotosmanageService], (service: CampushphotosmanageService) => {
    expect(service).toBeTruthy();
  }));
});
