import { TestBed, inject } from '@angular/core/testing';

import { LectureHallService } from './lecture-hall.service';

describe('LectureHallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectureHallService]
    });
  });

  it('should be created', inject([LectureHallService], (service: LectureHallService) => {
    expect(service).toBeTruthy();
  }));
});
