import {Department} from './Department.model';
import {Semester} from './Semester.model';

export class Student {
    public id: number;
    public fullName: string;
    public address: string;
    public email: string;
    public contact: string;
    public role: string;
    public department: Department;
    public imageUrl: string;
    public active: boolean;
    public semester: Semester;


    constructor() {
    }
}
