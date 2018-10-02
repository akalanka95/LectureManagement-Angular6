import {Semester} from './Semester.model';
import {Lecture} from './Lecture.model';
import {Department} from './Department.model';
import {LectureHall} from './LectureHall.model';

export class Course {
    public id: number;
    public courseCode: string;
    public courseName: string;
    public semester: Semester;
    public department: Department;
    public lecture: Lecture;
    public description: string;
    public courseCredit: number;
    constructor() {
    }
}
