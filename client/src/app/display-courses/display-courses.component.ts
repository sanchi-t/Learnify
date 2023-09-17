import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, Course } from '../_service/course.service'; // Import your CourseService here



@Component({
  selector: 'app-display-courses',
  templateUrl: './display-courses.component.html',
  styleUrls: ['./display-courses.component.css']
})
export class DisplayCoursesComponent implements OnInit {
  courseName: string = ''; // Initialize courseName
  courses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService // Inject your CourseService
  ) {}


  currentPage = 1;
  itemsPerPage = 15;

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.currentPage * this.itemsPerPage;
  }


  ngOnInit() {
    // Retrieve the courseName query parameter from the route
    this.route.queryParams.subscribe(params => {
      this.courseName = params['getCourse'];
      if (this.courseName) {
  
        // Use the courseName to fetch data from the backend via your CourseService
        this.courseService.getCourses(this.courseName).subscribe(data => {
          this.courses = data;
          console.log(data);
          // Handle the fetched data as needed
        });
      }
    });
  }
  convertToNumber(rating: string): number {
    // Extract the numeric part of the rating string and round it to the nearest integer
    const numericRating = Math.round(parseFloat(rating.match(/(\d+\.\d+)/)?.[0] || '0'));
    return numericRating;
  }
  

  getTotalPages(): number {
    return Math.ceil(this.courses.length / this.itemsPerPage);
  }
  
  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  onPageChange(newPage: number) {
    // Set the new current page
    this.currentPage = newPage;
  
    // Scroll to the top of the container element smoothly and faster
    window.scrollTo(0, 0)
  }
  

  openCourseUrl(url: string) {
    window.open(url, '_blank');
  }
  
  
  
}
