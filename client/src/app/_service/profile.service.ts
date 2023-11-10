import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000'; 
  
  constructor(private http: HttpClient) {}

    getUserProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.apiUrl}/user-profile`);
        // return this.userProfile; 
    }

    getCourseData(): Observable<Course[][]> {
        return this.http.get<Course[][]>(`${this.apiUrl}/course-data`);
    }
}
