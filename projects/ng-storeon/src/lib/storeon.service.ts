import { Injectable, Inject, OnDestroy } from '@angular/core';
import * as createStore from 'storeon';
import { BehaviorSubject, Observable } from 'rxjs';
import { STOREON } from './storeon.token';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreonService<State, Reducers = unknown> implements OnDestroy {

  private state$ = new BehaviorSubject<State>(this.store.get());

  private readonly unbind: Function;

  constructor(@Inject(STOREON) private store: createStore.Store<State>) {
    this.unbind = this.store.on('@changed', (state) => {
      this.state$.next({ ...state as any });

      return null;
    });
  }

  useStoreon<K>(mapFn: (state: State) => K): Observable<K>;
  useStoreon<K extends keyof State>(path: K): Observable<State[K]>;
  useStoreon(pathOrMapFn: ((state: State) => any) | string): Observable<any> {
    let mapped$;

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

  dispatch<K extends keyof Reducers>(event: K, data?: unknown) {
    this.store.dispatch(event, data);
  }

  ngOnDestroy(): void {
    if (this.unbind) {
      this.unbind();
    }
  }

}
