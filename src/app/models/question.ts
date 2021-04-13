import { Exam } from "./exam";

export class Question {
    id!: number;
    text:string;
    exam: Exam = new Exam;

    constructor(){
        this.text="";
    }
}
