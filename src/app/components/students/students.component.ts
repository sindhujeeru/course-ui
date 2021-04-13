import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonListComponent } from '../common-list.component';
import { BASE_ENDPOINT } from 'src/app/config/app';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent 
extends CommonListComponent<Student,StudentService> implements OnInit {

  baseEndPoint = BASE_ENDPOINT+'/students';
  constructor(protected service:StudentService) { 
    super(service);
    this.title = 'List of students';
    this.modelName = 'Student';
  }

  /*
  ngOnInit() {
    this.calRanges();
  }

  paging(event: PageEvent): void{
    this.currentPage = event.pageIndex;
    this.totalPerPage=event.pageSize;
    this.calRanges();
  }

  private calRanges(){
    //const currentPage = this.currentPage+'';
    //const totalPerPage = this.totalPerPage+'';
    this.service.listPages(this.currentPage.toString(),this.totalPerPage.toString()).
    subscribe(p => {
      this.students = p.content as Student[]; 
      this.totalStudents = p.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Students per page: ' 
    });
  }

  public delete(student:Student): void{

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
        this.service.remove(student.id).subscribe(() =>{
          //this.students = this.students.filter(a => a !== student);
          this.calRanges();
          Swal.fire('Deleted:',`Student ${student.name} is deleted successfully`,'success');
        });
      }
    })

  }*/

}
