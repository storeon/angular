import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Counter1Component } from './counter1.component';

describe('Counter1Component', () => {
  let component: Counter1Component;
  let fixture: ComponentFixture<Counter1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Counter1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Counter1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
