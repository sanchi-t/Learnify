import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  selected: string = 'Home';
  list:any;
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {
    this.list = [
       'Home',
       'Procing',
    ]; 
  
  }

  ngOnInit() {
    // Subscribe to the isLoggedIn$ observable to update the isLoggedIn property
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
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
  }
}
