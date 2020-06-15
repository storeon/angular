import { TestBed } from '@angular/core/testing';
import { Dispatch, Store, StoreonEvents } from 'storeon';

import { StoreonService } from './storeon.service';
import { STOREON } from './storeon.token';

const mockState = { testKey: '123' };
interface MockEvents extends StoreonEvents<typeof mockState> {
  'action': { data: string };
}

const mockStore: Store<typeof mockState, MockEvents> = {
  on: jasmine.createSpy('on').and.callFake((event, callback) => {
    callback(mockState);
  }),
  dispatch: {} as Dispatch<MockEvents>,
  get: () => mockState
};

describe('StoreonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: STOREON, useValue: mockStore }
    ]
  }));

  it('should call storeon dispatch method', () => {
    const dispatchMock = spyOn(mockStore, 'dispatch');
    const service: StoreonService<typeof mockState, MockEvents> = TestBed.get(StoreonService);
    service.dispatch('action', { data: '123' });

    expect(dispatchMock).toHaveBeenCalledWith('action', { data: '123' });
  });

  it('should return state observable by property key', (done) => {
    const service: StoreonService<typeof mockState, MockEvents> = TestBed.get(StoreonService);
    const changes = service.useStoreon('testKey');

    changes.subscribe(res => {
      expect(res).toEqual(mockState.testKey);
      done();
    });
  });

});
