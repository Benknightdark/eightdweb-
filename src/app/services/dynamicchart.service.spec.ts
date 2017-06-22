import { TestBed, inject } from '@angular/core/testing';

import { DynamicchartService } from './dynamicchart.service';

describe('DynamicchartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicchartService]
    });
  });

  it('should be created', inject([DynamicchartService], (service: DynamicchartService) => {
    expect(service).toBeTruthy();
  }));
});
