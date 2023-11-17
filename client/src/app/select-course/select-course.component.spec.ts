import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCourseComponent } from './select-course.component';

describe('SelectCourseComponent', () => {
  let component: SelectCourseComponent;
  let fixture: ComponentFixture<SelectCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCourseComponent]
    });
    fixture = TestBed.createComponent(SelectCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
