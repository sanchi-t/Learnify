import { Component } from '@angular/core';
import { CourseService,CurrentCourse } from '../_service/course.service';
import { MatDialog } from '@angular/material/dialog';
import { NotesDialogComponent } from './notes-dialog.component'; // Create a new component for the notes dialog
import { AuthService,UserJson } from '../_service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  courses: CurrentCourse = {
    id: 0,
    username: '',
    masterCourseStatus: '',
    courses: []
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

  constructor(private courseService: CourseService, public dialog: MatDialog, private authService: AuthService, private snackBar: MatSnackBar){
    this.userJson = authService.getUserJson();
  }

  ngOnInit() {
    this.loadCourseData();
  }


  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Adjust the duration as needed (milliseconds)
      panelClass: ['success-snackbar'], // Add custom CSS class for styling
    });
  }

  loadCourseData() {
    
    this.courseService.getCurrentCourses(this.userJson.username).subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
  }

  handleChange(item: any) {
    this.courseService.editCurrentCourses(this.userJson.username,item).subscribe(
      (data) => {
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
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
      this.courses.courses[courseIndex].lectures[lectureIndex].notes = result;
      const item = this.courses.courses[courseIndex].lectures[lectureIndex];
      this.courseService.editCurrentCourses(this.userJson.username,item).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error loading user profile', error);
        }
      );
      console.log('The dialog was closed',result);
    });
  }

  // app.component.ts
  calculateProgress(lecturesArray: { title: string; status: string; notes: string }[]): number {
    const doneCount = lecturesArray.filter(item => item.status === 'done').length;
    const totalCount = lecturesArray.length;
    return (doneCount / totalCount) * 100;
  }

  calculateAllProgress(): boolean {
    return this.courses.courses.every(course => {
      return this.calculateProgress(course.lectures) === 100;
    });
  }
  


  

  calculateDoneCount(lecturesArray: any[] | undefined): number {
    if (!lecturesArray) {
      return 0;
    }

    if(this.courses.masterCourseStatus!="complete" && this.calculateAllProgress()){
      this.courses.masterCourseStatus="complete"
      this.courseService.completedCurrentCourses(this.userJson.username,this.courses).subscribe(
        (data) => {
          this.showSuccessMessage('Course Completed Successfully');
          this.courses = {
            id: 0,
            username: '',
            masterCourseStatus: '',
            courses: []
          };
        },
        (error) => {
          console.error('Error loading user profile', error);
        }
      );
    }
  
    return lecturesArray.filter(item => item.status === 'done').length;
  }

  cancelCourse(): void{
    console.log('here',this.userJson);
    this.courseService.cancelCurrentCourses(this.userJson.username).subscribe(
      (data) => {
        this.showSuccessMessage('Course Cancelled Successfully');
        this.courses = {
          id: 0,
          username: '',
          masterCourseStatus: '',
          courses: []
        };
        // this.courses = [];
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
  }
  

  
}
