
import { Directive, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import Swal from "sweetalert2";
import { Generic } from "../models/generic";
import { CommonService } from "../services/common.service";

@Directive()
export abstract class CommonListComponent<E extends Generic, S extends CommonService<E>> implements OnInit{
  
    title = 'List of students';
    list: E[] =[];

    protected modelName: string;

    totalStudents =0;
    totalPerPage=4;
    currentPage=0;
    pageSizeOptions: number[] = [3, 5, 10, 25, 100];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(protected service:S) { }

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
        this.list = p.content as E[]; 
        this.totalStudents = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'items per page: ' 
        });
    }

    public delete(e:E): void{

        Swal.fire({
        title: 'Alert:',
        text: `Do you want to delete ${e.name} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.value) {
            this.service.remove(e.id).subscribe(() =>{
            //this.students = this.students.filter(a => a !== student);
            this.calRanges();
            Swal.fire('Deleted:',`${this.modelName} ${e.name} is deleted successfully`,'success');
            });
        }
        })

    }
    
}