import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../_service/custom-validator';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public registerForm!: FormGroup;

  constructor(private authService: AuthService,private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    { validators: CustomValidators.passwordsMatching }
  )
  }

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

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Adjust the duration as needed (milliseconds)
      panelClass: ['success-snackbar'], // Add custom CSS class for styling
    });
  }
  


  public onSubmit() {
    const { username,name , password, check } = this.registerForm.value;
    // const { username, password } = this.loginForm.value;
    this.authService.register(username, name, password).subscribe(response => {
      // Save token to local storage or handle as needed
      this.router.navigate(['/login']);
      this.showSuccessMessage('Account created successfully');
    },
    error => {
      // Handle registration errors
      console.error(error);
  
      if (error.error.message === 'username must be unique') {
        // Show an error pop-up dialog
        console.error("error");
        this.showErrorMessage('username must be unique');
      }}
    );
  
    
  }
}
