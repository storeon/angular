import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { STOREON } from '@storeon/angular';

import createStore, { Module, StoreonEvents } from 'storeon';
import devtools from 'storeon/devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CounterComponent } from './counter/counter.component';
import { Counter1Component } from './counter1/counter1.component';
import { HookCounterComponent } from './hook-counter/hook-counter.component';

// State structure
export interface State {
  count: number;
}

// Events declaration: map of event names to type of event data
export interface Events extends StoreonEvents<State> {
  // `inc` event which does not go with any data
  'inc': undefined;
}

// Initial state, reducers and business logic are packed in independent modules
const counterModule: Module<State, Events> = store => {
  // Initial state
  store.on('@init', () => ({
    count: 0
  }));

  // Events
  store.on('inc', ({ count }) => ({ count: count + 1 }));
};

export const defaultStore = createStore<State, Events>([counterModule, !environment.production && devtools]);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CounterComponent,
    Counter1Component,
    HookCounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: STOREON,
    useValue: defaultStore
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
