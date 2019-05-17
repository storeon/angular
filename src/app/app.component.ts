import { Component, OnInit } from '@angular/core';
import { NgStoreonService } from '@storeon/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changes: Observable<any>;
  changes1: Observable<any>;

  title = 'storeon-angular';

  constructor(private ngstoreon: NgStoreonService) {}

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
