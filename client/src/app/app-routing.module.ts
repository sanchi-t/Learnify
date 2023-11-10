import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CoursesComponent } from './courses/courses.component';
import { AuthService } from './_service/auth.service';
import { RecommendComponent } from './recommend/recommend.component';
import { DisplayCoursesComponent } from './display-courses/display-courses.component';
import { AuthGuard } from './_service/auth.gaurd';
import { NotFoundComponent } from './not-found/not-found.component'; 
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'register',
    component: SignupComponent,
    canActivate: [AuthGuard], 
  },
  {path: 'courses', component: CoursesComponent, canActivate: [AuthService]},
  {path: 'recommend', component: RecommendComponent, canActivate: [AuthService]},
  {path: 'displayCourses', component: DisplayCoursesComponent, canActivate: [AuthService]},
  {path: 'profile', component: ProfileComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
