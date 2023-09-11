import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  constructor(private router: Router, private http: HttpClient) {}

  viewCourse(course: Course) {
    // Navigate to the '/courses' route with parameters
    this.router.navigate(['/courses'], { queryParams: { getCourse: course.name } });
    this.sendToBackend(course.name);
  }

  sendToBackend(courseName: string) {
    const apiUrl = `http://localhost:3000/courses?courseName=${courseName}`; // Your backend API URL with query parameter

    // Make an HTTP GET request to send the parameter to the backend
    this.http.get(apiUrl).subscribe(
      (response) => {
        console.log('Parameter sent to the backend successfully:', response);
        // Handle the response from the backend if needed
      },
      (error) => {
        console.error('Error sending parameter to the backend:', error);
        // Handle any errors from the backend request
      }
    );
  }
}

interface Course {
  name: string;
  imageUrl: string;
}
