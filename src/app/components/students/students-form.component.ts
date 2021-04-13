import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent extends CommonFormComponent<Student, StudentService> implements OnInit {

  private fileSelect: File;
  
  constructor(service:StudentService, router: Router, route:ActivatedRoute) {
      super(service,router,route);
      this.title = "Add Student";
      this.e = new Student();
      this.redirect= '/students';
      this.modelName = 'Student';
    }

    public selectPhoto(event): void{
        this.fileSelect = event.target.files[0];
        console.info(this.fileSelect);

        if(this.fileSelect.type.indexOf('image')<0){
          this.fileSelect = null;
          Swal.fire('Error selecting photo:',
          'the file should be of image type',
          'error');
        }
    }

    public create(): void{
      if(!this.fileSelect){
        super.create();
      }else{
        this.service.addPhoto(this.e,this.fileSelect).subscribe(e => {
          console.log(e);
          Swal.fire('New:',`Student ${e.name} created successfully`,'success');
          this.router.navigate([this.redirect]);
        }, err =>{
          if(err.status === 400){
            this.error = err.error;
            console.log(this.error);
          }
        })
      }
    }

    public edit(): void{
      if(!this.fileSelect){
        super.edit();
      }else{
        this.service.editPhoto(this.e,this.fileSelect).subscribe(e => {
          console.log(e);
          Swal.fire('Modified:',`Student ${e.name} created successfully`,'success');
          this.router.navigate([this.redirect]);
        }, err =>{
          if(err.status === 400){
            this.error = err.error;
            console.log(this.error);
          }
        })
      }
    }

 /* ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if(id){
        this.service.getById(id).subscribe(student =>{
          this.student = student;  
        })
      }
    })
  }

  public create(): void{
    this.service.create(this.student).subscribe(student => {
      Swal.fire('New:',`Student ${student.name} created successfully`,'success');
      this.router.navigate(['/students']);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    })
  }

  public edit(): void{
    this.service.update(this.student).subscribe(student => {
      Swal.fire('Modified: ',`Student ${student.name} updated successfully`,'success');
      this.router.navigate(['/students']);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    })
  }
*/
}
