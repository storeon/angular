# @storeon/angular

<img src="https://storeon.github.io/storeon/logo.svg" align="right"
     alt="Storeon logo by Anton Lovchikov" width="160" height="142">

A tiny event-based Redux-like state manager **[Storeon]** for Angular.

**[Online Demo]** | **[Demo with Angular Ivy]**

It is just 533 bytes (minified and gzipped) Angular module. It uses [Size Limit] to control size.

Read more about Storeon **[article]**.

---------------------
[Storeon]: https://github.com/storeon/storeon
[article]: https://evilmartians.com/chronicles/storeon-redux-in-173-bytes
[Online Demo]: https://stackblitz.com/edit/angular-storeon
[Demo with Angular Ivy]:https://github.com/irustm/storeon-angular-ivy
[Size Limit]: https://github.com/ai/size-limit

## Compatibility

*@storeon/angular* **0.2.0**+ supports Angular **8**

*@storeon/angular* **0.1.0** supports Angular **7**

## How to use

```typescript
import createStore, { Module, StoreonEvents } from 'storeon';
import devtools from 'storeon/devtools';
import { environment } from 'src/environments/environment';

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

// your NgModule

import { STOREON } from '@storeon/angular';

@NgModule({
  providers: [{
    provide: STOREON,
    useValue: defaultStore  // your store
  }],
  ...
```


```typescript
// your component

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreonService } from '@storeon/angular';
import { State, Events } from '../app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changes: Observable<number>;
  constructor(private storeon: StoreonService<State, Events>) { }
  title = 'storeon-angular';

  ngOnInit() {
    this.changes = this.storeon.useStoreon('count');
  }

  updateState() {
    this.storeon.dispatch('inc');
  }
}

```

```typescript

// example using Ivy hooks

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UseStoreon } from '@storeon/angular';
import { Events, State } from '../app.module';
import { Dispatch } from 'storeon';

@Component({
  selector: 'app-hook-counter',
  templateUrl: './hook-counter.component.html',
  styleUrls: ['./hook-counter.component.scss']
})
@UseStoreon<State, Events>({keys: [ 'count' ], dispatcher: 'dispatch'})
export class HookCounterComponent implements OnInit {

  count: Observable<number>;
  dispatch: Dispatch<Events>;

  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.dispatch('inc');
  }
}

```
