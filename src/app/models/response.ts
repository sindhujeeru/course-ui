import { Question } from "./question";
import { Student } from "./student";

export class Response {

    id!:string;
    answer!:string;
    student:Student= new Student();
    //studentId:number;
    question:Question=new Question();
    //questionId:number;

    
}
