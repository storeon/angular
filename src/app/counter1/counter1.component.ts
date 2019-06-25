import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreonService } from '@storeon/angular';
import { State, Reducers } from '../app.module';

@Component({
  selector: 'app-counter1',
  templateUrl: './counter1.component.html',
  styleUrls: ['./counter1.component.scss']
})
export class Counter1Component implements OnInit {
  count: number;

  constructor() { }

  ngOnInit() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }

}
