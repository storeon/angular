import { Component, OnInit } from '@angular/core';
import { UseStoreon } from '@storeon/angular';
import { Observable } from 'rxjs';
import { StoreonDispatch } from 'storeon';

import { Events, State } from '../app.module';

@Component({
  selector: 'app-hook-counter',
  templateUrl: './hook-counter.component.html',
  styleUrls: ['./hook-counter.component.scss']
})
@UseStoreon<State, Events>({keys: [ 'count' ], dispatcher: 'dispatch'})
export class HookCounterComponent implements OnInit {

  count: Observable<number>;
  dispatch: StoreonDispatch<Events>;

  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.dispatch('inc');
  }
}
