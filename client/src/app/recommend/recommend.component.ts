import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../_service/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  courses: Course[] = [];
  currentSetIndex: number = 0;
  coursesPerPage: number = 4; // Number of courses per page
  showPreviousArrow: boolean = false;
  showNextArrow: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit() {

    // Retrieve the courseName query parameter from the route
    this.route.queryParams.subscribe(params => {
      // Use the courseName to fetch data from the backend via your CourseService
      this.courseService.getRecommendCourses().subscribe(data => {
        this.courses = data;
        console.log(data);
        // Handle the fetched data as needed
      });
    });
  }
// Function to show the previous set of courses
showPreviousSet() {
    this.currentSetIndex--;
    if (this.currentSetIndex < 0) {
      // If at the beginning, loop to the last set
      const totalSets = Math.ceil(this.courses.length / this.coursesPerPage);
      this.currentSetIndex = totalSets - 1;
    }
  
}


// Function to show the next set of courses
showNextSet() {
    const totalSets = Math.ceil(this.courses.length / this.coursesPerPage);
    this.currentSetIndex++;
    if (this.currentSetIndex >= totalSets) {
      // If at the end, loop to the first set
      this.currentSetIndex = 0;
    }
  
}



  // Function to get the courses to display based on the current set
  coursesToShow(): Course[] {
    console.log(this.currentSetIndex);
    const startIndex = this.currentSetIndex * this.coursesPerPage;
    const endIndex = startIndex + this.coursesPerPage;
    return this.courses.slice(startIndex, endIndex);
  }


  openCourseUrl(url: string) {
    window.open(url, '_blank');
  }


}
