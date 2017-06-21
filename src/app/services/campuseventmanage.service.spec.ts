import { TestBed, inject } from '@angular/core/testing';

import { CampuseventmanageService } from './campuseventmanage.service';

describe('CampuseventmanageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampuseventmanageService]
    });
  });

  it('should be created', inject([CampuseventmanageService], (service: CampuseventmanageService) => {
    expect(service).toBeTruthy();
  }));
});
