import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserJson } from './auth.service';
import { environment } from 'src/environments/environment';



interface Course {
  name: string;
  progress: number;
}



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl; 
  
  constructor(private http: HttpClient) {}

  getUserProfile(username: string): Observable<{user:UserJson}> {
    // Use URL parameters for the username
    return this.http.get<any>(`${this.apiUrl}/user-profile/${username}`);
  }
  

  getCourseData(username: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/course-data`,{username:username});
  }

  saveUserProfile(user: UserJson): Observable<[val:number]>{
    return this.http.post<any>(`${this.apiUrl}/user-profile`,{user});

  }
}
