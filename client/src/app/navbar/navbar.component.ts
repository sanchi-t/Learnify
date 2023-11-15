import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service'; 
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  name: string = '';
  selected: string = 'Home';
  list:any;
  isLoggedIn: boolean = false;
  isProfileDropdownOpen: boolean = false;
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {
    this.list = [
       'Home',
    ]; 
  
  }

  ngOnInit() {
    // Subscribe to the isLoggedIn$ observable to update the isLoggedIn property
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user.token;
      this.name = user.name;
      console.log(user);
    });
  
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }
  closeProfileDropdown() {
    this.isProfileDropdownOpen = false;
  }

  select(item: string) {
    this.selected = item; 
  };
  isActive(item: string) {
    return this.selected === item;
  };

  logout() {
    this.authService.logout(); // Call your AuthService logout method
    this.isLoggedIn = false; // Update the isLoggedIn variable
    this.router.navigate(['/home2']);
  }
}
