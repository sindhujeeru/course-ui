import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { CourseService } from 'src/app/services/course.service';
import { ExamService } from 'src/app/services/exam.service';

import { flatMap, map } from 'rxjs/operators'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-exams',
  templateUrl: './add-exams.component.html',
  styleUrls: ['./add-exams.component.css']
})
export class AddExamsComponent implements OnInit {

  course:Course;
  addExam:Exam[]=[];
  exams: Exam[]= [];

  autoCompleteControl = new FormControl();
  examsFiltered: Exam[] = [];

  displayedColumns = ['name','subject','delete'];
  displayedColumnsExams:string[] = ['id','name','subject','delete'];

  tabIndex = 0;

  datasource: MatTableDataSource<Exam>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions: number[] = [3,5,10,20,50];

  constructor(private route:ActivatedRoute,
    private courseService:CourseService,
    private examService:ExamService) { }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.courseService.getById(id).subscribe(c =>{ 
        this.course = c;
        this.exams = this.course.exams;
        this.initiatePaginator();
      });
    });
    this.autoCompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string'? value: value.name),
      flatMap(value => value? this.examService.searchForExam(value):[])
    ).subscribe(exams => this.examsFiltered = exams);
  }

  private initiatePaginator(){
    this.datasource = new MatTableDataSource<Exam>(this.exams);
    this.datasource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'items per page'
  }

  showName(exam? : Exam):string{
    return exam? exam.name:'';
  }

  selectExam(event: MatAutocompleteSelectedEvent): void{
    const exam = event.option.value as Exam;

    if(!this.existed(exam.id)){
      this.addExam = this.addExam.concat(exam);
      console.log(this.addExam);
      
    }else{
      Swal.fire(
        'Error:',
        `Exam ${exam.name} is already assigned to the course`,
        'error'
      );
    }
      this.autoCompleteControl.setValue('');
      event.option.deselect();
      event.option.focus();
  }

  private existed(id:number):boolean{
    let existed = false;
    this.addExam.concat(this.exams)
    .forEach(e => {
      if(id === e.id){
        existed = true;
      }
    });
    return existed;
  }

  deleteSubject(exam:Exam){
    this.addExam = this.addExam.filter(
      e => exam.id !== e.id
    );

  }

  add(): void{
    console.log(this.addExam)
    this.courseService.addExams(this.course,this.addExam)
    .subscribe(c => {
      this.exams = this.exams.concat(this.addExam);
      this.addExam = [];
      
      Swal.fire(
        'Added:',
        `Exams added successfully to the course ${c.name}`,
        'success'
      );
      this.tabIndex =2;
    })
  }

  removeExam(exam:Exam): void{
    Swal.fire({
      title: 'Alert:',
      text: `Do you want to delete ${exam.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
      if (result.value) {
        this.courseService.removeExams(this.course,exam).subscribe(course => {
          this.exams = this.exams.filter(e => e.id !== exam.id);
          
    
          Swal.fire(
            'Deleted:',
            `Student ${exam.name} deleted successfully from the ${course.name}`,
            'success'
          )
        });
      }
      })
  }

}
