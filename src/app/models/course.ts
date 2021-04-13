import { Exam } from "./exam";
import { Generic } from "./generic";
import { Student } from "./student";

export class Course implements Generic {

    id!: number;
    name!:string;
    createAt!: string;
    students:Student[]=[];
    exams:Exam[]=[];

    

}
