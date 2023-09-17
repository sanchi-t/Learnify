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
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.slides[0] = {
      src: 'https://static.infragistics.com/marketing/Blog-in-content-ads/Ignite-UI-Angular/ignite-ui-angular-you-get-ad.gif',
    };
    this.slides[1] = {
      src: 'https://static.infragistics.com/marketing/Blog-in-content-ads/Ignite-UI-Angular/ignite-ui-angular-you-get-ad.gif'
    };
    this.slides[2] = {
      src: 'https://static.infragistics.com/marketing/Blog-in-content-ads/Ignite-UI-Angular/ignite-ui-angular-you-get-ad.gif'
    };

    // Retrieve the courseName query parameter from the route
    this.route.queryParams.subscribe(params => {
      // Use the courseName to fetch data from the backend via your CourseService
      this.courseService.getRecommendCourses().subscribe(data => {
        this.courses = data;
        this.updateArrowVisibility();
        console.log(data);
        // Handle the fetched data as needed
      });
    });
  }

  // Function to show the previous set of courses
showPreviousSet() {
  if (this.showPreviousArrow) {
    this.currentSetIndex--;
    this.updateArrowVisibility();
  }
}

// Function to show the next set of courses
showNextSet() {
  if (this.showNextArrow) {
    const totalSets = Math.ceil(this.courses.length / this.coursesPerPage);
    if (this.currentSetIndex < totalSets - 1) {
      this.currentSetIndex++;
      this.updateArrowVisibility();
    }
  }
}


  // Function to get the courses to display based on the current set
  coursesToShow(): Course[] {
    const startIndex = this.currentSetIndex * this.coursesPerPage;
    const endIndex = startIndex + this.coursesPerPage;
    return this.courses.slice(startIndex, endIndex);
  }

  // Function to update arrow visibility
  updateArrowVisibility() {
    const totalSets = Math.ceil(this.courses.length / this.coursesPerPage);
    this.showPreviousArrow = this.currentSetIndex > 0;
    this.showNextArrow = this.currentSetIndex < totalSets - 1;
  }
}
