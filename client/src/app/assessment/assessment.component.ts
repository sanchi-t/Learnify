import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentAnswers, CourseService } from '../_service/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})


export class AssessmentComponent {
  answers: AssessmentAnswers = {
    question1: '',
    budget: null,
    hours: 0,
    experience: '',
    courseType: 'free',
  };

  experienceLevels = ['beginner', 'intermediate', 'advanced'];

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Adjust the duration as needed (milliseconds)
      panelClass: ['error-snackbar'], // Add custom CSS class for styling
    });
  }

  constructor(private router: Router,private snackBar: MatSnackBar,private courseService: CourseService) {}


  submitAssessment() {
    if (!this.answers.question1 || (this.answers.courseType === 'paid' && this.answers.budget === null) || !this.answers.experience) {
      this.showErrorMessage('Please fill out all fields.');

      return;
    }

    this.courseService.sendUserQuery(this.answers).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/home']);

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



