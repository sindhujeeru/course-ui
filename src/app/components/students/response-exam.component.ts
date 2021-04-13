import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { Response } from 'src/app/models/response';
import { Student } from 'src/app/models/student';
import { CourseService } from 'src/app/services/course.service';
import { ResponseService } from 'src/app/services/response.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { ResponseExamModelComponent } from './response-exam-model.component';
import { SeeExamModelComponent } from './see-exam-model.component';

@Component({
  selector: 'app-response-exam',
  templateUrl: './response-exam.component.html',
  styleUrls: ['./response-exam.component.css']
})
export class ResponseExamComponent implements OnInit {

  student:Student;
  course: Course;
  exames:Exam[]=[];
  displayedColumnsExams = ['id','name','subject','questions','respond','see'];

  dataSource: MatTableDataSource<Exam>;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;

  pageSizeOptions: number[] = [3,5,10,20,50];

  constructor(private route:ActivatedRoute,
    private studentService:StudentService,
    private courseService:CourseService,
    private responseService:ResponseService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.studentService.getById(id).subscribe(s => {
        this.student = s;
        this.courseService.getCoursePerStudentId(this.student).subscribe(
          course => {
            this.course = course;
            console.log(Object.keys(course).length);
            let len = Object.keys(course).length;
            for(let i=0;i<len;i++){
              this.exames = this.course[i].exams;
            }

            this.dataSource= new MatTableDataSource<Exam>(this.exames);
            this.dataSource.paginator = this.paginator
            this.paginator._intl.itemsPerPageLabel = 'Items per page:';
            
          }
        );
      });
    })
  }

  respondToExam(exam:Exam): void{
    const modelRef = this.dialog.open(ResponseExamModelComponent, {
      width: '750px',
      data:{course: this.course, student:this.student, exam:exam}
    });

    modelRef.afterClosed().subscribe((responseMap: Map<Number, Response>) => {
      console.log('Responses of the exam has been sent and saved');
      console.log(responseMap);

      if(responseMap){
        const responses: Response[] =  Array.from(responseMap.values());
        this.responseService.create(responses).subscribe(rs => {
          exam.responseVal = true;

          Swal.fire(
            'Sent:',
            'Responses Sent Successfully',
            'success'
          );
          console.log(rs);
        });
      }
    })
  }

  seeExam(exam:Exam): void{
    this.responseService.getResponsesOfStudentForExam(this.student, exam)
    .subscribe(rs => {
      const modelRef = this.dialog.open(SeeExamModelComponent,{
        width: '750px',
        data: {course: this.course, exam: exam, responses: rs }
      });

      modelRef.afterClosed().subscribe(() => {
        console.log('Model see exam is closed');
      })
    });
  }
  

}
