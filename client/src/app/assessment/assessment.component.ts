import { Component } from '@angular/core';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})


export class AssessmentComponent {
  paidCourse: boolean;
  onSliderChange(event: any) {
    const value = event.target.value;
    const sliderValueElement = document.getElementById("slider-value");
  
    if (sliderValueElement) {
      sliderValueElement.textContent = value + " hours";}
    }
    
  formData: any = {};

  constructor() {
    this.paidCourse = false;
  }

  submitAssessment(event: Event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Access the form data from the 'formData' object
    console.log('Form Data:', this.formData);

    // Here, you can add code to send the 'this.formData' to your backend or perform any other actions.
  }

  toggleCourse(){
    this.paidCourse = !this.paidCourse;
  }


}



