import { TestBed, inject } from '@angular/core/testing';

import { NoticeBoardService } from './notice-board.service';

describe('NoticeBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoticeBoardService]
    });
  });

  it('should be created', inject([NoticeBoardService], (service: NoticeBoardService) => {
    expect(service).toBeTruthy();
  }));
});
