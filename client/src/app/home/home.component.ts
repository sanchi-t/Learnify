import { Component } from '@angular/core';
import { CourseService } from '../_service/course.service';
import { MatDialog } from '@angular/material/dialog';
import { NotesDialogComponent } from './notes-dialog.component'; // Create a new component for the notes dialog


interface CourseItem {
  status: 'Pending' | 'Done' | 'Revisit';
  link: string;
  image: string;
  lectures: number;
  lecturesArray: { lectureNumber: number; status: string, notes: string }[];
}

interface CurrentCourse {
  title: string;
  items: CourseItem;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  courses: CurrentCourse[] = [];
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor(private courseService: CourseService, public dialog: MatDialog){

  }

  ngOnInit() {
    this.loadCourseData();    
    this.slides[0] = {
      src: '../assets/',
    };
    this.slides[1] = {
      src: '../assets/homepage_2.jpg',
    }
    this.slides[2] = {
      src: '../assets/homepage_2.jpg',
    }
  }

  loadCourseData() {
    
    this.courseService.getCurrentCourses().subscribe(
      (data) => {
        this.courses = data.map(course => ({
          ...course,
          items: {
            ...course.items,
            lecturesArray: Array.from({ length: course.items.lectures }, (_, index) => ({
              lectureNumber: index + 1,
              status: 'Pending',
              notes: ''
            }))
            // Array.from({ length: course.items.lectures }, (_, index) => index + 1)
          }
        }));
        console.log(data);
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
  }

  handleChange(item: any) {
    // Handle select change if needed
  }

  handleToggle(course: any) {
    // Handle details toggle if needed
    console.log(this.courses);

  }

  addNote(notes: string, courseIndex: number, lectureIndex: number) {
    const dialogRef = this.dialog.open(NotesDialogComponent, {
      width: '400px',
      data: {notes: notes}, // You can pass data to the dialog if needed
    });

    // After the dialog is closed, you can handle the result if needed
    dialogRef.afterClosed().subscribe(result => {
      this.courses[courseIndex].items.lecturesArray[lectureIndex].notes = result;
      console.log('The dialog was closed',result);
    });
  }

  // app.component.ts
  calculateProgress(lecturesArray: { lectureNumber: number; status: string; notes: string }[]): number {
    const doneCount = lecturesArray.filter(item => item.status === 'Done').length;
    const totalCount = lecturesArray.length;

    return (doneCount / totalCount) * 100;
  }

  calculateDoneCount(lecturesArray: any[] | undefined): number {
    if (!lecturesArray) {
      return 0;
    }
  
    return lecturesArray.filter(item => item.status === 'Done').length;
  }
  

  
}
