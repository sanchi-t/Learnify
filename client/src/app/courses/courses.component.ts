import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses: Course[] = [
    {
      name: 'Algorithms',
      imageUrl: '../assets/courses/algorithm.png',
    },
    {
      name: 'AI',
      imageUrl: '../assets/courses/ai.png',
      // Add other course details as needed
    },
    {
      name: 'Graphic Design',
      imageUrl: '../assets/courses/graphic_design.png',
      // Add other course details as needed
    },
    {
      name: 'UI Design',
      imageUrl: '../assets/courses/ui_design.png',
      // Add other course details as needed
    },
    {
      name: 'Web Development',
      imageUrl: '../assets/courses/web_development.png',
      // Add other course details as needed
    },
    {
      name: 'SEO',
      imageUrl: '../assets/courses/seo.png',
      // Add other course details as needed
    },
    {
      name: 'Marketing',
      imageUrl: '../assets/courses/marketing.png',
      // Add other course details as needed
    },
    {
      name: 'CS Courses',
      imageUrl: '../assets/courses/cs.png',
      // Add other course details as needed
    },
    // Add more courses as needed
  ];
  constructor(private router: Router) {}

  viewCourse(course: Course) {
    // Navigate to the '/courses' route with parameters
    this.router.navigate(['/displayCourses'], { queryParams: { getCourse: course.name } });
  }

}

interface Course {
  name: string;
  imageUrl: string;
}
