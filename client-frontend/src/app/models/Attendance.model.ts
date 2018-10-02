import {Semester} from './Semester.model';
import {Department} from './Department.model';
import {Lecture} from './Lecture.model';
import {LectureHall} from './LectureHall.model';

export class Attendance {
    public id: number;
    public monday: boolean;
    public tuesday: boolean;
    public  wednesday: boolean;
    public thursday: boolean;
    public friday: boolean;
    public lecture: Lecture;
    constructor() {
    }
}
