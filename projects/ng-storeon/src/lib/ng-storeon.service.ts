import { Injectable, Inject, OnDestroy } from '@angular/core';
import * as createStore from 'storeon';
import { BehaviorSubject, Observable } from 'rxjs';
import { STOREON } from './storeon.token';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NgStoreonService implements OnDestroy {

  private state$ = new BehaviorSubject(this.store.get());

  private readonly unbind: Function;

  constructor(@Inject(STOREON) private store: createStore.Store) {
    this.unbind = this.store.on('@changed', (state) => {
      this.state$.next({...state});

      return null;
    });
  }

  // TODO add typings
  useStoreon(pathOrMapFn: ((state: any) => any) | string): Observable<any> {
    let mapped$: Observable<any>;

    if (typeof pathOrMapFn === 'string') {
      mapped$ = this.state$.pipe(pluck(pathOrMapFn));
    } else if (typeof pathOrMapFn === 'function') {
      mapped$ = this.state$.pipe(
        map(source => pathOrMapFn(source))
      );
    } else {
      throw new TypeError(
        `Unexpected type '${typeof pathOrMapFn}' in select operator,` +
        ` expected 'string' or 'function'`
      );
    }

    return mapped$.pipe(distinctUntilChanged());
  }

  dispatch(event: string, data?: unknown) {
    this.store.dispatch(event, data);
  }

  ngOnDestroy(): void {
    if (this.unbind) {
      this.unbind();
    }
  }

}
