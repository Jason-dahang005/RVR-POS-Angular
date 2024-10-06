import { TestBed } from '@angular/core/testing';

import { BookedCottageService } from './booked-cottage.service';

describe('BookedCottageService', () => {
  let service: BookedCottageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedCottageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
