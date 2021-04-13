import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {
   
  course:Course;
  addStudent:Student[]=[];
  students: Student[]= [];
  
  displayedColumns:string[] = ['name','lastName','select'];
  displayedColumnsStudents:string[] = ['id','name','lastName','email','delete'];
  
  tabIndex = 0;
  
  datasource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions: number[] = [3,5,10,20,50];

  select: SelectionModel<Student> = new SelectionModel<Student>(true,[]);

  constructor(private route:ActivatedRoute,
    private courseService:CourseService,
    private studentService:StudentService) { }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.courseService.getById(id).subscribe(c => {
        this.course = c;
        this.students = this.course.students;
        this.initiatePaginator();
      });
    })
  }

  initiatePaginator(): void{
    this.datasource = new MatTableDataSource<Student>(this.students);
    this.datasource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'items per page'
  }

  search(event:any): void{
    let name:string = (<HTMLInputElement>event.target).value;
    name  = name != undefined? name.trim(): '';
    if(name !== ''){
      this.studentService.searchByName(name)
      .subscribe(students => this.addStudent = students.filter(s =>{
        let fil = true;
        this.course.students.forEach(cs => {
          if(s.id === cs.id){
            fil = false;
          }
        });
        return fil;
      }));
    }
      
  }

  ifAllSelected(): boolean{
    const selectedOnes = this.select.selected.length;
    const numStudents = this.addStudent.length;
    return (selectedOnes === numStudents);
  }

  selectAll(): void{
    this.ifAllSelected()? this.select.clear():
    this.addStudent.forEach(s => this.select.select(s));
  }

  add(): void{
    console.log(this.select.selected);
    this.courseService.addStudents(this.course,this.select.selected)
    .subscribe(c=>{
      this.tabIndex = 2;
      Swal.fire(
        'Added:',
        `Students Added successfully to course ${this.course.name}`,
        'success'
      );
      this.initiatePaginator();
      this.addStudent = [];
      this.select.clear();
    });
  }

  removeStudent(student:Student): void{
    Swal.fire({
      title: 'Alert:',
      text: `Do you want to delete ${student.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
      if (result.value) {
        this.courseService.removeStudent(this.course,student).subscribe(course => {
          this.students = this.students.filter(s => s.id !== student.id);
          
    
          Swal.fire(
            'Deleted:',
            `Student ${student.name} deleted successfully from the ${course.name}`,
            'success'
          )
        });
      }
      })
    
  }

}
