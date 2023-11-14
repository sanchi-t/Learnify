import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2Component } from './home2.component';

describe('Home2Component', () => {
  let component: Home2Component;
  let fixture: ComponentFixture<Home2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Home2Component]
    });
    fixture = TestBed.createComponent(Home2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
