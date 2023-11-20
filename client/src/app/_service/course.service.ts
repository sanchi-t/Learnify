import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Router } from '@angular/router'; 
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = environment.apiUrl; // Update with your API URL

  constructor(private http: HttpClient,private router: Router) {}

  getCourses(courseName: string): Observable<Course[]> {
    const url = `${this.apiUrl}/courses?courseName=${courseName}`;
    return this.http.get<{ courses: Course[] }>(url).pipe(
      map((response: { courses: Course[] }) => {
        
        if (response.courses.length === 0) {
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
          this.router.navigate(['/error']);
        }
        return response.courses;
      })
    );
  }


  getCurrentCourses(username: string): Observable<CurrentCourse> {
    const url = `${this.apiUrl}/current-course/${username}`;
    return this.http.get<CurrentCourse>(url);
  }

  cancelCurrentCourses(username: string): Observable<CurrentCourse> {
    const url = `${this.apiUrl}/current-course/${username}`;
    return this.http.delete<CurrentCourse>(url);
  }

  addCurrentCourses(username: string, course: CourseSet): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/current-course`,{username,course});
  }

  editCurrentCourses(username: string, updatedLecture: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/current-course`,{username,updatedLecture});
  }

  completedCurrentCourses(username: string, course: CurrentCourse): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/current-course`,{username,course});
  }

  sendUserQuery(assessmentAnswers: AssessmentAnswers, username: string): Observable<void> {
    return this.http.post<any>(`${this.apiUrl}/select-course`, {assessmentAnswers,username});
  }

  selectCourses(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/select-course/${username}`);
  }

}

export interface CurrentCourse {
  id: number;
  username: string;
  masterCourseStatus: string;
  courses: Array<{
      course_title: string;
      course_url: string;
      lectures: Array<{
          status: string;
          title: string;
          notes: string;
      }>;
  }>;
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


export interface AssessmentAnswers {
  question1: string;
  budget: number | null;
  hours: number;
  experience: string;
  courseType: string;
}



interface Selectcourse {
  author: string;
  course_card_rating: string;
  course_id: number;
  course_title: string;
  duration: string;
  no_of_lectures: string;
}

export interface CourseSet {
  courses: Selectcourse[];
  name: string;
  total_duration: number;
  total_price: number;
}

export interface CourseData {
  createdAt: string;
  id: number;
  recommendedCourses: CourseSet[];
  updatedAt: string;
  username: string;
}


