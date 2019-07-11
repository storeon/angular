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
