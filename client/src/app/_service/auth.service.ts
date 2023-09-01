import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable ,tap} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private apiUrl = 'http://localhost:3000';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {   }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(() => {
        this.isLoggedInSubject.next(true); // Update authentication status on successful login
      })
    );
  }
  register(username: string, name:string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`,{ username, name, password});
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
