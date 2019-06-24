import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreonModule, STOREON } from '@storeon/angular';
import { environment } from '../environments/environment';

import * as createStore from 'storeon';
import * as devTools from 'storeon/devtools';

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

  const effects = new Reducers();
  for (const key in effects) {
    if (effects.hasOwnProperty(key)) {
      const effect = effects[key];
      store.on(key, effect);
    }
  }
};

export const store = createStore([increment, !environment.production && devTools]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreonModule
  ],
  providers: [{
    provide: STOREON,
    useValue: store
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
