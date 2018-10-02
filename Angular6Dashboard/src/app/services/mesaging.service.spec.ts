import { TestBed, inject } from '@angular/core/testing';

import { MesagingService } from './mesaging.service';

describe('MesagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MesagingService]
    });
  });

  it('should be created', inject([MesagingService], (service: MesagingService) => {
    expect(service).toBeTruthy();
  }));
});
