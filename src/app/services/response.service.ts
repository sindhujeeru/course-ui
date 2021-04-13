import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Exam } from '../models/exam';
import { Response } from '../models/response';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  protected baseEndPoint = BASE_ENDPOINT+'/responses';

  private header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  create(resps: Response[]):Observable<Response[]>{
    return this.http.post<Response[]>(this.baseEndPoint, resps, {headers:this.header});
  }

  getResponsesOfStudentForExam(student:Student, exam:Exam): Observable<Response[]>{
    return this.http.get<Response[]>(`${this.baseEndPoint}/student/${student.id}/exam/${exam.id}`);
  }
}
