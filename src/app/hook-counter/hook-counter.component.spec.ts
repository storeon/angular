import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HookCounterComponent } from './hook-counter.component';

describe('HookCounterComponent', () => {
  let component: HookCounterComponent;
  let fixture: ComponentFixture<HookCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HookCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HookCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
