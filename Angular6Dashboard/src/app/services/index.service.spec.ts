import { TestBed, inject } from '@angular/core/testing';

import { IndexService } from './index.service';

describe('IndexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexService]
    });
  });

  it('should be created', inject([IndexService], (service: IndexService) => {
    expect(service).toBeTruthy();
  }));
});
