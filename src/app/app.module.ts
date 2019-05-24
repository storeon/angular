import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgStoreonModule, STOREON } from '@storeon/angular';
import { environment } from '../environments/environment';

import * as createStore from 'storeon';
import * as devTools from 'storeon/devtools';

export interface State {
  count: number;
  count1: number;
}

const increment = (store: createStore.Store<State>) => {
  store.on('@init', () => ({ count: 0, count1: 0 }));
  store.on('inc', ({ count }) => ({ count: count + 1 }));
  store.on('inc1', ({ count1 }) => ({ count1: count1 + 1 }));
};

export const store = createStore([increment, !environment.production && devTools]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgStoreonModule
  ],
  providers: [{
    provide: STOREON,
    useValue: store
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
