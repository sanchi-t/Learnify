import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {
  private readonly tokenKey = 'token';
  private apiUrl = 'http://localhost:3000';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedInSubject.next(!!this.getToken());
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(() => {
        this.isLoggedInSubject.next(true); // Update authentication status on successful login
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
      // Redirect to the login page or any other route
      this.router.navigate(['/login']); // Replace 'login' with your login route
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  logout() {
    // Perform logout logic here
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
  }
}
