import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCoursesComponent } from './display-courses.component';

describe('DisplayCoursesComponent', () => {
  let component: DisplayCoursesComponent;
  let fixture: ComponentFixture<DisplayCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayCoursesComponent]
    });
    fixture = TestBed.createComponent(DisplayCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
