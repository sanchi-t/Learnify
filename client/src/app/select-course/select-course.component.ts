import { Component } from '@angular/core';
import { SelectCourseList,CourseService } from '../_service/course.service';
@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.css']
})
export class SelectCourseComponent {
  // courses: SelectCourseList = [];
  constructor(private courseService: CourseService){ }
courses= [ [
  {
    title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
    items: 
      { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
      // Add more items as needed
    
  },
  {
      title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
      items: 
        { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
        // Add more items as needed
      
  },
  {
      title: 'Azure DevOps Fundamentals for Beginners',
      items: 
        { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        // Add more items as needed
      
  },
  {
    title: 'Azure DevOps Fundamentals for Beginners',
    items: 
      { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
      // Add more items as needed
    
},
{
  title: 'Azure DevOps Fundamentals for Beginners',
  items: 
    { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
    // Add more items as needed
  
},
], [
  {
    title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
    items: 
      { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
      // Add more items as needed
    
  },
  {
      title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
      items: 
        { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
        // Add more items as needed
      
  },
  {
      title: 'Azure DevOps Fundamentals for Beginners',
      items: 
        { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        // Add more items as needed
      
  },
], [
  {
    title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
    items: 
      { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
      // Add more items as needed
    
  },
  {
      title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
      items: 
        { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
        // Add more items as needed
      
  },
  {
      title: 'Azure DevOps Fundamentals for Beginners',
      items: 
        { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        // Add more items as needed
      
  },
], [
  {
    title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
    items: 
      { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
      // Add more items as needed
    
  },
  {
      title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
      items: 
        { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
        // Add more items as needed
      
  },
  {
      title: 'Azure DevOps Fundamentals for Beginners',
      items: 
        { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        // Add more items as needed
      
  },
]];

  addCourse(index: number){
    console.log(this.courses[index]);
  }

}