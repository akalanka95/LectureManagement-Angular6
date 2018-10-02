import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {TimeTable} from '../models/TimeTable.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../services/department.service';
import {HttpClient} from '@angular/common/http';
import {StudentService} from '../services/student.service';
import {LectureService} from '../services/lecture.service';
import {Lecture} from '../models/Lecture.model';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {DayService} from '../services/day.service';
import {Day} from '../models/Day.model';
import {TimeService} from '../services/time.service';
import {Time} from '../models/Time.model';
import {LectureHall} from '../models/LectureHall.model';
import {LectureHallService} from '../services/lecture-hall.service';
import {Course} from '../models/Course.model';
import {CourseService} from '../services/course.service';
import {SemesterService} from '../services/semester.service';
import {Semester} from '../models/Semester.model';
import {TimeTableService} from '../services/time-table.service';
import {Student} from '../models/Student.model';
import {Subject} from 'rxjs/Rx';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    @ViewChild('f') addSubjectForm: NgForm;
    timeTable: TimeTable = new TimeTable();
    courseCode: string;
    courseName: string;
    courseCredit: number;
    lectureList: Lecture [] = [];
    dayList: Day [] = [];
    timeList: Time [] = [];
    lectureHallList: LectureHall [] = [];
    semesterList: Semester [] = [] ;
    timeTableList: TimeTable [] = [];
    subjectLecture: Lecture = null;
    subjectDay: Day = null;
    subjectStartTime: Time = null;
    subjectEndTime: Time = null;
    subjectLectureHall: LectureHall = null;
    subjectSemester: Semester = null;
    timeTableObject: TimeTable = new TimeTable();
    courseObject: Course = new Course();
    editSubject: TimeTable;
    options: FormGroup;
    modalForm: FormGroup;
    email = new FormControl('', [Validators.required, Validators.email]);
    constructor(private fb: FormBuilder ,
                private studentService: StudentService,
                private departmentService: DepartmentService,
                private lectureService: LectureService,
                private dayService: DayService,
                private timeService: TimeService,
                private lectureHallService: LectureHallService,
                private courseService: CourseService,
                private semesterService: SemesterService,
                private timeTableService: TimeTableService,
                private route: ActivatedRoute,
                private router: Router,
                private http: HttpClient) {
        this.modalForm = fb.group({
            modalFormEmailEx: ['', [Validators.email, Validators.required]],
        });
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
    }
   /* getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }*/

ngOnInit() {
      this.lectureService.getListOfLectures()
          .subscribe(
              (lectureList: any[]) => {
                  this.lectureList = lectureList;
              },
              (error) => console.log(error)
          );
        this.dayService.getListOfDays()
            .subscribe(
                (dayList: any[]) => {
                    this.dayList = dayList;
                },
                (error) => console.log(error)
            );
        this.timeService.getListOfTimes()
            .subscribe(
                (timeList: any[]) => {
                    this.timeList = timeList;
                    console.log(this.timeList);
                },
                (error) => console.log(error)
            );
        this.lectureHallService.getListOfHalls()
            .subscribe(
                (hallList: any[]) => {
                    this.lectureHallList = hallList;
                },
                (error) => console.log(error)
            );
    this.semesterService.getListOfSemesters()
        .subscribe(
            (semesterList: any[]) => {
                this.semesterList = semesterList;
            },
            (error) => console.log(error)
        );
    this.timeTableService.getListOfTimeTables().subscribe(
        (timeTableList: any[]) => {
            this.timeTableList = timeTableList;
        },
        (error) => console.log(error)
    );
    }

    onSubmit(form: NgForm) {
        console.log('this for is going to submit now');
        console.log(this.courseCode);
        console.log(this.courseName);
        console.log(form);
        this.courseObject.courseCode = this.courseCode;
        this.courseObject.courseName = this.courseName;
        this.courseObject.courseCredit = this.courseCredit;
        this.courseObject.lecture = this.subjectLecture;
        this.courseObject.semester = this.subjectSemester;
        console.log(this.courseObject);
        this.timeTableObject.lectureHall = this.subjectLectureHall;
        this.timeTableObject.lecture = this.subjectLecture;
        this.timeTableObject.semester = this.subjectSemester;
        this.timeTableObject.date = this.subjectDay;
        this.timeTableObject.startTime = this.subjectStartTime;
        this.timeTableObject.endTime = this.subjectEndTime;
        this.timeTableObject.active = true;
        this.timeTableObject.state = 'old';
        this.timeTableObject.nWeek = true;
        this.timeTableObject.tWeek = true;
        console.log('This is the Course Object' + this.courseObject);
        /*this.courseService.postNewCourse(this.courseObject)
            .subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
            );*/
        this.courseService.postNewCourse(this.courseObject)
            .subscribe(
                (course: Course) => {
                    this.timeTableObject.course  = course;
                    this.timeTableService.postNewTimeTable(this.timeTableObject)
                        .subscribe(
                            (response) => {
                                console.log(response);
                                this.timeTableService.getListOfTimeTables().subscribe(
                                    (timeTableList: any[]) => {
                                        this.timeTableList = timeTableList;
                                    },
                                    (error) => console.log(error)
                                );
                            },
                            (error) => console.log(error)
                        );
                    console.log(course);
                },
                (error) => console.log(error)
            );
        /*this.timeTableService.postNewTimeTable(this.timeTableObject)
                .subscribe(
                    (response) => {
                        console.log(response);
                        this.timeTableService.getListOfTimeTables().subscribe(
                            (timeTableList: any[]) => {
                                this.timeTableList = timeTableList;
                            },
                            (error) => console.log(error)
                        );
                    },
                    (error) => console.log(error)
                );*/
            this.addSubjectForm.resetForm();
    }

    selectLectures(lectures) {
        console.log(lectures);
        this.subjectLecture = lectures;
    }
    selectDay(days) {
        console.log(days);
        this.subjectDay = days;
    }
    selectStartTime(times) {
        console.log(times);
        this.subjectStartTime = times;
    }
    selectEndTime(times) {
        console.log(times);
        this.subjectEndTime = times;
    }
    selectHall(halls) {
        console.log(halls);
        this.subjectLectureHall = halls;
    }
    selectSemester(Semesters) {
        console.log(Semesters);
        this.subjectSemester = Semesters;
    }
    onDeleteSubject(timeTable: TimeTable) {
        this.timeTableService.delete(timeTable)
            .subscribe(
                (res) => {
                   console.log(res);
                    this.timeTableService.getListOfTimeTables().subscribe(
                        (timeTableList: any[]) => {
                            this.timeTableList = timeTableList;
                        },
                        (error) => console.log(error)
                    );
                },
                (error) => console.log(error)
            )
    }
}
