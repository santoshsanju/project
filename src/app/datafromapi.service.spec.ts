import { TestBed } from '@angular/core/testing';

import { DatafromapiService } from './datafromapi.service';

describe('DatafromapiService', () => {
  let service: DatafromapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatafromapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
