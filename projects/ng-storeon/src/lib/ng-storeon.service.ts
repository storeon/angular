import { Injectable, Inject, Optional } from '@angular/core';
import * as createStore from 'storeon';
import { Subject } from 'rxjs';
import { STOREON } from './storeon.token';

@Injectable({
  providedIn: 'root'
})
export class NgStoreonService {
  constructor(@Optional() @Inject(STOREON) public store: createStore.Store) { }
  useStoreon(...keys: string[]) {
    const obs = new Subject();
    this.store.on('@changed', (_, changed) => {
      const changesInKeys = keys.some(key => key in changed);
      if (changesInKeys) {
        obs.next(changed);
      }
      return null;
    });
    return {
      dispatch: this.store.dispatch,
      changes: obs
    };
  }
}
