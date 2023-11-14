import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

// import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm!: FormGroup;

  // constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      check: new FormControl(false),
    });
  }

  constructor(private authService: AuthService, private router: Router,private snackBar: MatSnackBar, private cookieService: CookieService) {}

  hidePassword = true;

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Adjust the duration as needed (milliseconds)
      panelClass: ['error-snackbar'], // Add custom CSS class for styling
    });
  }

  public onSubmit() {
    const { username, password, check } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        const user = { ...response.user };
        delete user.password;
        delete user.id;
        const serializedUser = JSON.stringify(user);
        this.cookieService.set('user', serializedUser);
  
        // Set the token based on the 'check' flag
        const token = response.token;
        if (check) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }
        this.authService.updateUser();
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
  
        if (error.error.message === 'Invalid credentials') {
          this.showErrorMessage('Invalid credentials');
        }
      }
    );
  }
  
}

