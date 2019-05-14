import { TestBed } from '@angular/core/testing';
import * as createStore from 'storeon';
import { NgStoreonService } from './ng-storeon.service';
import { STOREON } from './storeon.token';
import { Subject } from 'rxjs';

const mockStore: createStore.Store = {
  on: jasmine.createSpy('on'),
  dispatch: jasmine.createSpy('dispatch'),
  get: () => {}
};

describe('NgStoreonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: STOREON, useValue: mockStore }
    ]
  }));

  it('useStoreon should expose correct api: dispatch function and changes subject', () => {
    const service: NgStoreonService = TestBed.get(NgStoreonService);
    const { dispatch, changes } = service.useStoreon('test key');

    expect(dispatch).toEqual(mockStore.dispatch);
    expect(changes).toEqual(new Subject());
  });

  // TODO add test for checking that subject returns correct state for existing keys
});
