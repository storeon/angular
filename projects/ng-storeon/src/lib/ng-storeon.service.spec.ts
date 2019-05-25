import { TestBed } from '@angular/core/testing';
import * as createStore from 'storeon';
import { NgStoreonService } from './ng-storeon.service';
import { STOREON } from './storeon.token';

const mockState = {testKey: '123'};

const mockStore: createStore.Store = {
  on: jasmine.createSpy('on').and.callFake((event, callback) => {
    callback(mockState);
  }),
  dispatch: jasmine.createSpy('dispatch'),
  get: () => {}
};

describe('NgStoreonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: STOREON, useValue: mockStore }
    ]
  }));

  it('should call storeon dispatch method', () => {
    const service: NgStoreonService<typeof mockState> = TestBed.get(NgStoreonService);
    service.dispatch('action', {data: '123'});

    expect(mockStore.dispatch).toHaveBeenCalledWith('action', {data: '123'});
  });

  it('should return state observable by property key', (done) => {
    const service: NgStoreonService<typeof mockState> = TestBed.get(NgStoreonService);
    const changes = service.useStoreon('testKey');

    changes.subscribe(res => {
      expect(res).toEqual(mockState.testKey);
      done();
    });
  });

});
