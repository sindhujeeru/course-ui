import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
import { Subject } from 'src/app/models/subject';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent extends CommonFormComponent<Exam, ExamService> implements OnInit {

  subjectParent: Subject[] = [];
  subjectChild: Subject[] = [];

  errorQuestion: string;

  constructor(service:ExamService, router: Router, route:ActivatedRoute) {
    super(service,router,route);
    this.title = "Add Exam";
    this.e = new Exam();
    this.redirect= '/exams';
    this.modelName = 'Exam';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if(id){
        this.service.getById(id).subscribe(e =>{
          this.e = e;
          this.title = 'Edit '+this.modelName;
          this.listChildSubjects();
          /*this.service.findAllSubjects().subscribe(
            subjects => 
            this.subjectChild = subjects.filter(s=>s.parent && s.parent.id === this.e.subjectParent.id)); */
        });
      }
    });

    this.service.findAllSubjects().subscribe(subjects => {
        this.subjectParent = subjects.filter(s => !s.parent)
    })
  }

  listChildSubjects(): void{
    this.subjectChild = this.e.subjectParent? 
    this.e.subjectParent.children:[];
  }

  public create(): void{
    if(this.e.questions.length === 0){
      //Swal.fire('Question errors','Exam should contain questions','error');
      this.errorQuestion = 'Exam should contain questions';
      return;
    }
    this.errorQuestion = undefined;
    this.deleteEmptyQuestion();
    super.create();
  }

  public edit(): void{
    if(this.e.questions.length === 0){
      //Swal.fire('Question errors','Exam should contain questions','error');
      this.errorQuestion = 'Exam should contain questions';
      return;
    }
    this.errorQuestion = undefined;
    this.deleteEmptyQuestion();
    super.edit();
  }

  compareSubject(s1:Subject, s2:Subject):boolean{
    if(s1===undefined && s2===undefined){
      return true;
    }

    return (s1 === null || s2 === null || s1 === undefined || s2 === undefined)
    ? false : s1.id === s2.id; 
  }
  
  addQuestion(): void{
    this.e.questions.push(new Question());
  }

  addText(question:Question, event:any): void{
    question.text = event.target.value;
    console.log(this.e);
  }

  deleteQuestion(question:Question):void{
    this.e.questions = this.e.questions.filter(q => question.text !== q.text);
  }

  deleteEmptyQuestion(): void{
    this.e.questions = this.e.questions.filter(q => q.text != null && q.text.length>0);
  }


}
