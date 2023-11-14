import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserJson } from './auth.service';



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

  getUserProfile(username: string): Observable<{user:UserJson}> {
    // Use URL parameters for the username
    return this.http.get<any>(`${this.apiUrl}/user-profile/${username}`);
  }
  

  getCourseData(): Observable<Course[][]> {
      return this.http.get<Course[][]>(`${this.apiUrl}/course-data`);
  }

  saveUserProfile(user: UserJson): Observable<[val:number]>{
    return this.http.post<any>(`${this.apiUrl}/user-profile`,{user});

  }
}
