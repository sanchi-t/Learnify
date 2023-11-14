import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_service/profile.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, UserJson } from '../_service/auth.service';





interface Course {
  name: string;
  progress: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: UserJson = {
    id: 0,
    name: '',
    username: '',
    phoneno: '',
    createdAt: '',
    address: '',
    updatedAt: '',
    
  };

  userJson: UserJson = {
    id: 0,
    name: '',
    username: '',
    phoneno: null,
    createdAt: '',
    updatedAt: '',
    address: null,
  }

  courses: Course[][] =[];
  
  editedUserProfile: UserJson;
  editMode: boolean;

  constructor(private profileService: ProfileService,private cookieService: CookieService, private authService: AuthService) {
    this.editMode = false;
    this.editedUserProfile = { ...this.userProfile };
    this.userJson = authService.getUserJson();

    // Load user profile data from the backend
    
  }

  ngOnInit() {
    this.loadUserProfile();
    this.loadCourseData();    
  }

  loadUserProfile() {
    
    this.profileService.getUserProfile(this.userJson.username).subscribe(
      (data) => {
        const {user} = data; 
        this.userProfile = user;
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
  }

  // Uncomment this function if you have a getCourseData function in ProfileService
  loadCourseData() {
    this.profileService.getCourseData().subscribe(
      (data) => {
        this.courses = data;
        
      },
      (error) => {
        console.error('Error loading course data', error);
      }
    );

  }

  toggleEditMode() {
    this.editMode = !this.editMode;

    // If entering edit mode, make a copy of the user profile for editing
    if (this.editMode) {
      this.editedUserProfile = { ...this.userProfile };
    }
  }

  saveChanges() {
    // Update the user profile with the edited data
    this.userProfile = { ...this.editedUserProfile };
    this.profileService.saveUserProfile(this.editedUserProfile).subscribe(
      (data) => {
        console.log('saved',data);
        if(data[0]==1){
          const serializedUser = JSON.stringify(this.userProfile);
          this.cookieService.set('user', serializedUser);
          this.authService.updateUser();
        }
        
      },
      (error) => {
        console.error('Error loading course data', error);
      }
    );
    // Exit edit mode
    this.editMode = false;
  }

  // Function to cancel the edit and revert to the original data
  cancelEdit() {
    // Exit edit mode and revert to the original data
    this.editMode = false;
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
