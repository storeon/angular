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

## How to use

```typescript
import * as createStore from 'storeon'
import * as devTools from 'storeon/devtools';

export interface State {
  count: number
}

// Initial state, reducers and business logic are packed in independent modules
let increment = (store: createStore.Store<State>) => {
  // Initial state
  store.on('@init', () => ({ count: 0 }))
  // Reducers returns only changed part of the state
  store.on('inc', ({ count }) => ({ count: count + 1 }))
}

export const store = createStore([increment, !environment.production && devTools])

// your NgModule

import { StoreonModule, STOREON } from '@storeon/angular';

@NgModule({
  imports: [StoreonModule], // StoreonModule
  ...
  providers: [{
    provide: STOREON,
    useValue: store  // your store
  }],
  ...
```


```typescript
// your component

import { Component, OnInit } from '@angular/core';
import { StoreonService } from '@storeon/angular';
import { State } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changes: Observable<number>;
  constructor(private storeon: StoreonService<State>) { }
  title = 'storeon-angular';

  ngOnInit() {
    this.changes = this.storeon.useStoreon('count');
  }

  updateState() {
    this.storeon.dispatch('inc');
  }
}

```
