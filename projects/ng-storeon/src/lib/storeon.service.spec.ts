import { TestBed } from '@angular/core/testing';
import * as createStore from 'storeon';
import { StoreonService } from './storeon.service';
import { STOREON } from './storeon.token';

const mockState = { testKey: '123' };

const mockStore: createStore.Store = {
  on: jasmine.createSpy('on').and.callFake((event, callback) => {
    callback(mockState);
  }),
  dispatch: jasmine.createSpy('dispatch'),
  get: () => { }
};

describe('StoreonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: STOREON, useValue: mockStore }
    ]
  }));

  it('should call storeon dispatch method', () => {
    const service: StoreonService<typeof mockState> = TestBed.get(StoreonService);
    service.dispatch('action', { data: '123' });

    expect(mockStore.dispatch).toHaveBeenCalledWith('action', { data: '123' });
  });

  it('should return state observable by property key', (done) => {
    const service: StoreonService<typeof mockState> = TestBed.get(StoreonService);
    const changes = service.useStoreon('testKey');

    changes.subscribe(res => {
      expect(res).toEqual(mockState.testKey);
      done();
    });
  });

});
