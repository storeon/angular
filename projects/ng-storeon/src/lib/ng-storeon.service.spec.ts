import { TestBed } from '@angular/core/testing';

import { NgStoreonService } from './ng-storeon.service';

describe('NgStoreonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgStoreonService = TestBed.get(NgStoreonService);
    expect(service).toBeTruthy();
  });
});
