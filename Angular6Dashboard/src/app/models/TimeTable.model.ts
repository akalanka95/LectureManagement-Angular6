
import {Time} from './Time.model';
import {Course} from './Course.model';
import {LectureHall} from './LectureHall.model';
import {Day} from './Day.model';
import {Semester} from './Semester.model';
import {Lecture} from './Lecture.model';

export class TimeTable {
    public id: number;
    public active: boolean;
    public  state: string;
    public date: Day;
    public course: Course;
    public semester: Semester;
    public startTime: Time;
    public endTime: Time;
    public lecture: Lecture;
    public  tWeek: boolean;
    public  nWeek: boolean;
    public lectureHall: LectureHall;
    public weekId: number;

    constructor() {
    }

    /*constructor(id: number, day: string,
                active: boolean,
                state: string, course: Course,
                lectureHall: LectureHall, lecture: Lecture, department: Department, semester: Semester, startTime: Time, endTime: Time) {
        this.id = id;
        this.day = day;
        this.active = active;
        this.state = state;
        this.course = course;
        this.lectureHall = lectureHall;
        this.lecture = lecture;
        this.department = department;
        this.semester = semester;
        this.startTime = startTime;
        this.endTime = endTime;
    }*/
}
