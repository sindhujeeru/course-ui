import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export class CommonFormComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  title:string;
  e: E;
  error:any;
  protected redirect:string;
  protected modelName:string;
  
  constructor(protected service:S,
              protected router: Router,
              protected route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if(id){
        this.service.getById(id).subscribe(e =>{
          this.e = e;
          this.title = 'Edit '+this.modelName;  
        })
      }
    })
  }

  public create(): void{
    this.service.create(this.e).subscribe(e => {
      Swal.fire('New:',`${this.modelName} ${e.name} created successfully`,'success');
      this.router.navigate([this.redirect]);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    })
  }

  public edit(): void{
    this.service.update(this.e).subscribe(e => {
      Swal.fire('Modified: ',`${this.modelName} ${e.name} updated successfully`,'success');
      this.router.navigate([this.redirect]);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    })
  }

}
