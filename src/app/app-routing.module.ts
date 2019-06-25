import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounterComponent } from './counter/counter.component';
import { Counter1Component } from './counter1/counter1.component';

const routes: Routes = [
  { path: 'counter', component: CounterComponent },
  { path: 'counter1', component: Counter1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
