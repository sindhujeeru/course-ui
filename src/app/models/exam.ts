import { Generic } from "./generic";
import { Question } from "./question";
import { Subject } from "./subject";

export class Exam implements Generic{

    id!: number;
    name!:string;
    createAt!: string;
    questions:Question[]=[];
    subjectParent: Subject;
    subjectChild: Subject;
    responseVal!: Boolean;

    
}
