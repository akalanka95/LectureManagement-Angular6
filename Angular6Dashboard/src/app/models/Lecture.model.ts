import {Department} from './Department.model';
import {Attendance} from './Attendance.model';

export class Lecture {
    public id: number;
    public fullName: string;
    public address: string;
    public email: string;
    public contact: string;
    public role: string;
    public department: Department;
    public imageUrl: string;
    public active: boolean;
    public attendance: Attendance;
    public code: string;


    constructor() {
    }
}
