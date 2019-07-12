import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounterComponent } from './counter/counter.component';
import { Counter1Component } from './counter1/counter1.component';
import { HookCounterComponent } from './hook-counter/hook-counter.component';

const routes: Routes = [
  { path: 'counter', component: CounterComponent },
  { path: 'counter1', component: Counter1Component },
  { path: 'ivy-hook', component: HookCounterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
