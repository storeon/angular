import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreonModule, STOREON } from '@storeon/angular';
import * as createStore from 'storeon';
import * as devTools from 'storeon/devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CounterComponent } from './counter/counter.component';
import { Counter1Component } from './counter1/counter1.component';

export interface State {
  count: number;
  count1: number;
}

export class Reducers {
  'inc' = ({ count }) => ({ count: count + 1 });
  'inc1' = ({ count1 }) => ({ count1: count1 + 1 });
}

const increment = (store: createStore.Store<State>) => {
  store.on('@init', () => ({ count: 0, count1: 0 }));

  const reducers = new Reducers();
  for (const key in reducers) {
    if (reducers.hasOwnProperty(key)) {
      const reducer = reducers[key];
      store.on(key, reducer);
    }
  }
};

export const defaultStore = createStore([increment, !environment.production && devTools]);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CounterComponent,
    Counter1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreonModule
  ],
  providers: [{
    provide: STOREON,
    useValue: defaultStore
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
