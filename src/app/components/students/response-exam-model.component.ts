import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
import { Response } from 'src/app/models/response';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-response-exam-model',
  templateUrl: './response-exam-model.component.html',
  styleUrls: ['./response-exam-model.component.css']
})
export class ResponseExamModelComponent implements OnInit {

  course: Course;
  student: Student;
  exam: Exam;

  responses : Map<number, Response> = new Map<number, Response>();

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public modelRef: MatDialogRef<ResponseExamModelComponent>) { }

  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.student = this.data.student as Student;
    this.exam = this.data.exam as Exam;
  }

  cancel(): void{
    this.modelRef.close();
  }
   respond(question: Question, event): void{

    const text = event.target.value as string;
     const resp = new Response();

     resp.student = this.student;
     resp.question = question;

     const ex  = new Exam();
     ex.id = this.exam.id;
     ex.name = this.exam.name;

     resp.question.exam = ex;
     resp.answer = text;

     this.responses.set(question.id, resp);

     console.log(this.responses);

   }

}
