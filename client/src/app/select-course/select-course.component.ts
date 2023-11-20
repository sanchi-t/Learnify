import { Component } from '@angular/core';
import {CourseSet, CourseData, CourseService } from '../_service/course.service';
import { AuthService,UserJson } from '../_service/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.css']
})


export class SelectCourseComponent {
  userJson: UserJson = {
    id: 0,
    name: '',
    username: '',
    phoneno: null,
    createdAt: '',
    updatedAt: '',
    address: null,
    completedNo: 0,
    masterCourseStatus: 'Not Enrolled',
  }

  courseInfo: CourseData = {
    createdAt: '',
    id: 0,
    recommendedCourses: [],
    updatedAt: '',
    username: '',
  };
  courseset: CourseSet = {
    courses: [],
    name: '',
    total_duration: 0,
    total_price: 0,
  };

  constructor(private router: Router,private courseService: CourseService, private authService: AuthService){
    this.userJson = authService.getUserJson();
   }

ngOnInit() {
  this.loadCourseData();
}
loadCourseData() {
    
  this.courseService.selectCourses(this.userJson.username).subscribe(
    (data) => {
      
      
      if (data.recommendedCourses && Array.isArray(data.recommendedCourses)) {
        // Convert each recommendedCourses string to JSON objects
        data.recommendedCourses = data.recommendedCourses.map((course: any) => {
          return {
            ...course,
            // ...(JSON.parse(course)),
          };
        });
      }

      this.courseInfo = data;
      this.courseset = data.recommendedCourses;
      console.log(data);
    },
    (error) => {
      console.error('Error loading user profile', error);
    }
  );
}
  addCourse(index: number){
    console.log(this.courseInfo.recommendedCourses[index]);
    const course = this.courseInfo.recommendedCourses[index];
    this.courseService.addCurrentCourses(this.userJson.username,course).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
  }

}