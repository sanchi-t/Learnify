import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator
import { Router } from '@angular/router'; // Import Router


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000'; // Update with your API URL

  constructor(private http: HttpClient,private router: Router) {}

  getCourses(courseName: string): Observable<Course[]> {
    const url = `${this.apiUrl}/courses?courseName=${courseName}`;
    return this.http.get<{ courses: Course[] }>(url).pipe(
      map((response: { courses: Course[] }) => {
        
        if (response.courses.length === 0) {
          console.log('hi');
          this.router.navigate(['/error']);
        }
        return response.courses;
      })
    );
  }


  getRecommendCourses(): Observable<Course[]> {
    const url = `${this.apiUrl}/recommend`;
    return this.http.get<{ courses: Course[] }>(url).pipe(
      map((response: { courses: Course[] }) => {
        
        if (response.courses.length === 0) {
          console.log('hi');
          this.router.navigate(['/error']);
        }
        return response.courses;
      })
    );
  }
}

export interface Course {
  course_id: number;
  title: string;
  title_url: string;
  image: string;
  summary: string;
  rating: string;
  review: string;
  duration: string;
  no_of_lectures: string;
  level_course: string;
  author: string;
  course_card_rating: string;
  price: string;
}
