import { Component } from '@angular/core';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent {
  courses: Course[] = [
    {
      title: 'Course Title 1',
      description: 'This is a brief description of Course 1.',
    },
    {
      title: 'Course Title 2',
      description: 'This is a brief description of Course 2.',
    },
    {
      title: 'Course Title 3',
      description: 'This is a brief description of Course 3.',
    },
    {
      title: 'Course Title 4',
      description: 'This is a brief description of Course 4.',
    },
  ];

  // You can add any additional logic or functions here as needed.
}

interface Course {
  title: string;
  description: string;
}