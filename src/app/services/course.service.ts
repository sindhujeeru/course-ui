import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Course } from '../models/course';
import { Exam } from '../models/exam';
import { Student } from '../models/student';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CommonService<Course> {
  
  protected baseEndPoint = BASE_ENDPOINT+'/courses';
  constructor(http: HttpClient) {
    super(http);
   }

  addStudents(course:Course, students:Student[]): Observable<Course>{
    return this.http.put<Course>(`${this.baseEndPoint}/${course.id}/add-student`,
    students, {headers: this.header});
  }
  
  removeStudent(course:Course, student:Student): Observable<Course>{
    return this.http.put<Course>(`${this.baseEndPoint}/${course.id}/remove-student`,student,{headers:this.header});
  }

  addExams(course: Course, exams: Exam[]): Observable<Course>{
    return this.http.put<Course>(`${this.baseEndPoint}/${course.id}/add-exam`,exams,{headers:this.header});
  }

  removeExams(course:Course, exam:Exam): Observable<Course>{
    return this.http.put<Course>(`${this.baseEndPoint}/${course.id}/remove-exam`,exam,{headers:this.header});
  }

  getCoursePerStudentId(student:Student): Observable<Course>{
    return this.http.get<Course>(`${this.baseEndPoint}/student/${student.id}`)
  }
  
}
