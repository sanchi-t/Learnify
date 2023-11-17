import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { CoursesComponent } from './courses/courses.component';
import { RecommendComponent } from './recommend/recommend.component';
import { DisplayCoursesComponent } from './display-courses/display-courses.component';
import { AuthService } from './_service/auth.service';
import { TitleTruncatePipe } from './_pipe/title-truncate.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { CarouselModule } from '@coreui/angular';
import { ProfileComponent } from './profile/profile.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { FooterComponent } from './footer/footer.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { InformComponent } from './inform/inform.component';
import { FormsModule } from '@angular/forms';
import { SelectCourseComponent } from './select-course/select-course.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CoursesComponent,
    RecommendComponent,
    DisplayCoursesComponent,
    TitleTruncatePipe,
    NotFoundComponent,
    ProfileComponent,
    FooterComponent,
    AssessmentComponent,
    InformComponent,
    SelectCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    CarouselModule,
    FormsModule,
    MdbCheckboxModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
