import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentAnswers, CourseService } from '../_service/course.service';
import { Router } from '@angular/router';
import { AuthService,UserJson } from '../_service/auth.service';



@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})


export class AssessmentComponent {
  answers: AssessmentAnswers = {
    question1: '',
    budget: null,
    hours: 1,
    experience: '',
    courseType: 'free',
  };

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

  experienceLevels = ['beginner', 'intermediate', 'advanced'];

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Adjust the duration as needed (milliseconds)
      panelClass: ['error-snackbar'], // Add custom CSS class for styling
    });
  }

  constructor(private router: Router,private snackBar: MatSnackBar,private courseService: CourseService,private authService: AuthService) {
    this.userJson = authService.getUserJson();
  }


  submitAssessment() {
    if (!this.answers.question1 || (this.answers.courseType === 'paid' && this.answers.budget === null) || !this.answers.experience) {
      this.showErrorMessage('Please fill out all fields.');

      return;
    }

    this.courseService.sendUserQuery(this.answers,this.userJson.username).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/select-course']);

      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );

    console.log('Assessment Answers:', this.answers);

    // Add your logic to submit the assessment
  }

  togglePaidCourse() {
    this.answers.courseType = 'paid';
  }

  toggleFreeCourse() {
    this.answers.courseType = 'free';
    this.answers.budget= null;
  }

  onSliderChange(event: any) {
    this.answers.hours = event.target.value;
  }

}



