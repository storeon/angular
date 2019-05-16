# @storeon/angular

<img src="https://storeon.github.io/storeon/logo.svg" align="right"
     alt="Storeon logo by Anton Lovchikov" width="160" height="142">

A tiny event-based Redux-like state manager **[Storeon]** for Angular.

**[Online Demo]** | **[Demo with Angular Ivy]**

It is just 526 bytes (minified and gzipped) Angular module. It uses [Size Limit] to control size.

Read more about Storeon **[article]**.

---------------------
[Storeon]: https://github.com/storeon/storeon
[article]: https://evilmartians.com/chronicles/storeon-redux-in-173-bytes
[Online Demo]: https://stackblitz.com/edit/angular-storeon
[Demo with Angular Ivy]:https://github.com/irustm/storeon-angular-ivy
[Size Limit]: https://github.com/ai/size-limit

## How to use

```typescript
import createStore from 'storeon'

// Initial state, reducers and business logic are packed in independent modules
let increment = store => {
  // Initial state
  store.on('@init', () => ({ count: 0 }))
  // Reducers returns only changed part of the state
  store.on('inc', ({ count }) => ({ count: count + 1 }))
}

export const store = createStore([increment])

// your NgModule

import { NgStoreonModule, STOREON } from '@storeon/angular';

@NgModule({
  imports: [NgStoreonModule], // NgStoreonModule
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
import { NgStoreonService } from '@storeon/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changes: Subject<any>;
  dispatch: Function;
  constructor(private ngstoreon: NgStoreonService) { }
  title = 'storeon-angular';

  ngOnInit() {
    const { dispatch, changes } = this.ngstoreon.useStoreon('count');
    this.dispatch = dispatch;
    this.changes = changes;
  }

  updateState() {
    this.dispatch('inc');
  }
}

```
