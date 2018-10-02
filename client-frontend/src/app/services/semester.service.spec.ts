import { TestBed, inject } from '@angular/core/testing';

import { SemesterService } from './semester.service';

describe('SemesterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SemesterService]
    });
  });

  it('should be created', inject([SemesterService], (service: SemesterService) => {
    expect(service).toBeTruthy();
  }));
});
