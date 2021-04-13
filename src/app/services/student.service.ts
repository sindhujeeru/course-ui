
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { CommonService } from './common.service';
import {BASE_ENDPOINT} from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends CommonService<Student> {
  
  protected baseEndPoint = BASE_ENDPOINT+'/students'
  constructor(http: HttpClient) {
    super(http);
   }

   public addPhoto(student:Student, archive: File): Observable<Student>{
     
     const formData = new FormData();
     formData.append('archive',archive);
     formData.append('name',student.name); 
     formData.append('lastName',student.lastName);
     formData.append('email',student.email);
     
     return this.http.post<Student>(this.baseEndPoint+'/add-photo',formData)
   }

   public editPhoto(student:Student, archive: File): Observable<Student>{
     
    const formData = new FormData();
    formData.append('archive',archive);
    formData.append('name',student.name); 
    formData.append('lastName',student.lastName);
    formData.append('email',student.email);
    
    return this.http.put<Student>(`${this.baseEndPoint}/update-photo/${student.id}`,formData)
  }

  public searchByName(name:string):Observable<Student[]>{
    return this.http.get<Student[]>(`${this.baseEndPoint}/search/${name}`);
  }

}
