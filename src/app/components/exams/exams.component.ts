import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { Exam } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/exam.service';
import { CommonListComponent } from '../common-list.component';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent extends CommonListComponent<Exam, ExamService> implements OnInit {

  baseEndPoint = BASE_ENDPOINT+'/exams';
  constructor(protected service:ExamService) { 
    super(service);
    this.title = 'List of exams';
    this.modelName = 'Exam';
  }

}
