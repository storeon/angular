import { Component, OnInit } from '@angular/core';
import { NgStoreonService } from 'projects/ng-storeon/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changes: any;
  dispath: any;
  constructor(private ngstoreon: NgStoreonService) { }
  title = 'sroreon-angular';

  ngOnInit() {
    const { dispatch, changes } = this.ngstoreon.useStoreon('count');
    this.dispath = dispatch;
    this.changes = changes;
  }

  updateState() {
    this.dispath('inc');
  }
}
