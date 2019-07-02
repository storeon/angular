import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreonService } from '@storeon/angular';
import { State, Reducers } from '../app.module';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  count$: Observable<number>;

  constructor(private storeon: StoreonService<State, Reducers>) { }

  ngOnInit() {
    this.count$ = this.storeon.useStoreon('count');
  }

  increment() {
    this.storeon.dispatch('inc');
  }

}
