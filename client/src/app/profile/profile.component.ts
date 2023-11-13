import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_service/profile.service';
import { CookieService } from 'ngx-cookie-service';


interface UserProfile {
  fullname: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  // Add more fields here
}

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

  userProfile: UserProfile = {
    fullname: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    
  };

  courses: Course[][] =[];
  
  editedUserProfile: UserProfile;
  name: string;
  editMode: boolean;

  constructor(private profileService: ProfileService,private cookieService: CookieService) {
    this.editMode = false;
    this.editedUserProfile = { ...this.userProfile };
    const cookie = this.cookieService.get('user');
    
    if (cookie) {
      const userDecode = decodeURI(cookie);
      const userJson = JSON.parse(userDecode);
      this.name = userJson.name;
      console.log(userJson);
    } else {
      // Set a default name if it's not available in local storage
      this.name = 'DefaultName';
    }

    // Load user profile data from the backend
    
  }

  ngOnInit() {
    this.loadUserProfile();
    this.loadCourseData();    
  }

  loadUserProfile() {
    
    this.profileService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
        console.log(data);
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
    // Save changes to the backend
    // Assuming you have a saveUserProfile function in the ProfileService
    // this.profileService.saveUserProfile(this.editedUserProfile).subscribe(...);
    // Exit edit mode
    this.editMode = false;
  }

  // Function to cancel the edit and revert to the original data
  cancelEdit() {
    // Exit edit mode and revert to the original data
    this.editMode = false;
  }
}
