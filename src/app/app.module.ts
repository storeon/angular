import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgStoreonModule, STOREON } from 'ng-storeon';

import * as createStore from 'storeon';

const increment = store => {
  store.on('@init', () => ({ count: 0 }));
  store.on('inc', ({ count }) => ({ count: count + 1 }));
};

export const store = createStore([increment]);

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
