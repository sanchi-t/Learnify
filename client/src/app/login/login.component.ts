import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private authService: AuthService, private router: Router,private snackBar: MatSnackBar) {}

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
    const { username, password,check } = this.loginForm.value;
    this.authService.login(username, password).subscribe(response => {
      // Save token to local storage or handle as needed
      if(check){
        localStorage.setItem('token', response.token);
      }
      else{
        sessionStorage.setItem('token', response.token);
      } 
      
      this.router.navigate(['/home']);
      
    }
    ,
    error => {
      // Handle registration errors
      console.error(error);
  
        if (error.error.message === 'Invalid credentials') {
          // Show an error pop-up dialog
          this.showErrorMessage('Invalid credentials');
        }
      } 
    );
    
  }
}

