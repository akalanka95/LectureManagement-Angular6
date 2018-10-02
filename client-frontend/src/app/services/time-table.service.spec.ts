import { TestBed, inject } from '@angular/core/testing';

import { TimeTableService } from './time-table.service';

describe('TimeTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeTableService]
    });
  });

  it('should be created', inject([TimeTableService], (service: TimeTableService) => {
    expect(service).toBeTruthy();
  }));
});
