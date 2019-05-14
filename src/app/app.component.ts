import { Component, OnInit } from '@angular/core';
import { NgStoreonService } from 'projects/ng-storeon/src/public_api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changes: Subject<any>;
  dispatch: Function;
  constructor(private ngstoreon: NgStoreonService) { }
  title = 'sroreon-angular';

  ngOnInit() {
    const { dispatch, changes } = this.ngstoreon.useStoreon('count');
    this.dispatch = dispatch;
    this.changes = changes;
  }

  updateState() {
    this.dispatch('inc');
  }
}
