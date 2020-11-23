import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { StoreonEvents, StoreonStore } from 'storeon';

import { STOREON } from './storeon.token';

@Injectable({
  providedIn: 'root'
})
export class StoreonService<State, Events extends StoreonEvents<State> = any> implements OnDestroy {

  private state$ = new BehaviorSubject<State>(this.store.get());

  private readonly unbind: Function;

  constructor(@Inject(STOREON) private store: StoreonStore<State, Events>) {
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

  dispatch<K extends keyof Events>(event: K, data?: Events[K]) {
    // @ts-ignore
    this.store.dispatch(event, data);
  }

  ngOnDestroy(): void {
    if (this.unbind) {
      this.unbind();
    }
  }

}
