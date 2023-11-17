import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private readonly tokenKey = 'token';
  private apiUrl = environment.apiUrl;
  private userSubject = new BehaviorSubject<User>({ token: '', name: '' });

  user$: Observable<User> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.updateUser(); // Update the user object
    }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((userData) => {
        console.log('Login Response:', userData);
        this.updateUser(); // Update the user object
      })
    );
  }

  register(username: string, name: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, name, password });
  }

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home2']);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey) || '';
  }

  getUserJson(): UserJson {
    const cookie = this.cookieService.get('user');
    if (cookie) {
      const userDecode = decodeURI(cookie);
      const userJson: UserJson = JSON.parse(userDecode);
      return userJson;
    } else {
      return {
        id: 0,
        name: '',
        username: '',
        phoneno: null,
        createdAt: '',
        updatedAt: '',
        address: null,
        completedNo: 0,
        masterCourseStatus: 'Not Enrolled',
      }; 
    }
  }

  updateUser(): void {
    const token: string = this.getToken();
    const name: string = this.getUserJson().name;
    console.log('Token:', token);
    console.log('Name:', name);
    const user: User = { token, name };
    console.log('User:', user);
    this.userSubject.next(user);
  }
  

  logout() {
    this.cookieService.delete('user');
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    this.updateUser(); // Reset the user object to default on logout
  }
}

interface User {
  token: string;
  name: string;
}

export interface UserJson {
  id: number;
  name: string;
  username: string;
  phoneno: string | null;
  createdAt: string;
  updatedAt: string;
  address: string | null;
  completedNo: number;
  masterCourseStatus: string;
  // Add more fields here
}
