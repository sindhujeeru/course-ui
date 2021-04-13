import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Exam } from '../models/exam';
import { Subject } from '../models/subject';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends CommonService<Exam> {
  
  protected baseEndPoint = BASE_ENDPOINT+'/exams';
  constructor(http: HttpClient) {
    super(http);
   }

   public findAllSubjects(): Observable<Subject[]>{
     return this.http.get<Subject[]>(`${this.baseEndPoint}/subjects`);
   }

   searchForExam(name:string): Observable<Exam>{
    return this.http.get<Exam>(`${this.baseEndPoint}/search/${name}`);
  }
}
