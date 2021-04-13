import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { CommonListComponent } from '../common-list.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent extends CommonListComponent<Course,CourseService> implements OnInit {

  constructor(protected service:CourseService) { 
    super(service);
    this.title = 'List of Courses';
    this.modelName = 'Course';
  }

}
