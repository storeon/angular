import { Component, OnInit } from '@angular/core';
import { StoreonService } from '@storeon/angular';
import { Observable } from 'rxjs';
import { State } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changes$: Observable<number>;
  changes1$: Observable<number>;

  title = 'storeon-angular';

  constructor(private storeon: StoreonService<State>) { }

  ngOnInit() {
    this.changes$ = this.storeon.useStoreon('count');

    this.changes1$ = this.storeon.useStoreon('count1');
  }

  updateState() {
    this.storeon.dispatch('inc');
  }

  updateState1() {
    this.storeon.dispatch('inc1');
  }
}
