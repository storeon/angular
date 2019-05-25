import { Component, OnInit } from '@angular/core';
import { NgStoreonService } from '@storeon/angular';
import { Observable } from 'rxjs';
import { State } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changes: Observable<number>;
  changes1: Observable<number>;

  title = 'storeon-angular';

  constructor(private ngstoreon: NgStoreonService<State>) { }

  ngOnInit() {
    this.changes = this.ngstoreon.useStoreon('count');

    this.changes1 = this.ngstoreon.useStoreon('count1');
  }

  updateState() {
    this.ngstoreon.dispatch('inc');
  }

  updateState1() {
    this.ngstoreon.dispatch('inc1');
  }
}
