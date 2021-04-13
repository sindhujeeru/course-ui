import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import {Response} from 'src/app/models/response';

@Component({
  selector: 'app-see-exam-model',
  templateUrl: './see-exam-model.component.html',
  styleUrls: ['./see-exam-model.component.css']
})
export class SeeExamModelComponent implements OnInit {

  course: Course;
  exam: Exam;
  responses: Response[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public modelRef: MatDialogRef<SeeExamModelComponent>) { }

  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.exam = this.data.exam as Exam;
    this.responses = this.data.responses as Response[];
  }

  create(): void{
    this.modelRef.close();
  }

}
