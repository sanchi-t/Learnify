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
import { AssessmentComponent } from './assessment/assessment.component';
import { InformComponent } from './inform/inform.component';
import { FormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserProgressChartComponent } from './user-progress-chart/user-progress-chart.component';
import { ProgressComponent } from './progress/progress.component';
// import { ChartsModule } from 'ng2-charts';



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
    AssessmentComponent,
    InformComponent,
    FeedbackComponent,
    UserProgressChartComponent,
    ProgressComponent,
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
    // ChartsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
