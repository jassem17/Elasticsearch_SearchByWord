import { TestBed } from '@angular/core/testing';

import { ElkServiceService } from './elk-service.service';

describe('ElkServiceService', () => {
  let service: ElkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
