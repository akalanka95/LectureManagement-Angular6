import { Component, OnInit } from '@angular/core';
import {TimeTable} from '../models/TimeTable.model';
import {Week} from '../models/Week.model';
import {Course} from '../models/Course.model';
import {Semester} from '../models/Semester.model';
import {TimeTableService} from '../services/time-table.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../services/course.service';
import {SemesterService} from '../services/semester.service';
import {WeekService} from '../services/week.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  semesterList: Semester[] = [];
  courseList: Course[] = [];
  weekList: Week[] = [];
  selectWeekId: number;
  semesterId: number;
  lectureId: number;
  courseId: number;
  timeTableWeekList: TimeTable[] = [];
  timeTableWeekListByWeek: TimeTable[] = [];
  searchBySubject = true;
  searchByWeek = false;
  allWeek = false;
  constructor(private courseService: CourseService,
              private semesterService: SemesterService,
              private timeTableService: TimeTableService,
              private weekService: WeekService,
              private router: Router,
              private route: ActivatedRoute) { this.loadScripts(); }
  loadScripts() {
    const dynamicScripts = [
      'https://platform.twitter.com/widgets.js',
      'http://www.shieldui.com/shared/components/latest/js/shieldui-all.min.js',
      'http://www.shieldui.com/shared/components/latest/js/jszip.min.js',
      'assets/js/jquery-3.0.0.min.js',
      'assets/js/main.js',
      'assets/js/modernizr.js',
      'assets/js/pdf.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  ngOnInit() {
    this.semesterService.getListOfSemesters()
      .subscribe(
        (semesterList: any[]) => {
          this.semesterList = semesterList;
        },
        (error) => console.log(error)
      );
    this.weekService.findWeek()
      .subscribe(
        (week: Week[]) => {
          this.weekList = week;
        },
        (error) => console.log(error)
      );
  }
  selectSemester(semester: Semester) {
    this.semesterId = semester.id;
    this.courseService.getListOfCoursesBySemester(semester.id)
      .subscribe(
        (courseList: any[]) => {
          this.courseList = courseList;
        },
        (error) => console.log(error)
      );
  }
  selectCourse (course: Course) {
    this.courseId = course.id;
    this.lectureId = course.lecture.id;
  }
  onSearch() {
    this.loadScripts();
    this.searchBySubject = true;
    this.searchByWeek = false;
    this.timeTableService.getListOfTimeTableWeekBySemIdAndCourseId(this.semesterId , this.courseId)
      .subscribe(
        (weekList: TimeTable[]) => {
          this.timeTableWeekList = weekList;
          console.log('this is timeTableWeek List');
          console.log(this.timeTableWeekList);
        },
        (error) => console.log(error)
      );
  }
  selectWeek (week: Week) {
    this.allWeek = false;
    if (week.week === 'All Weeks') {
      this.allWeek = true;
      this.selectWeekId = week.id;
    } else {
      this.selectWeekId = week.id;
    }
  }
  onSearchByWeek() {
    this.loadScripts();
    this.searchBySubject = false;
    this.searchByWeek = true;
    if ( this.allWeek === false) {
      this.timeTableService.getListOfTimeTableWeekBySemIdAndWeekId(this.semesterId , this.selectWeekId)
        .subscribe(
          (weekList: TimeTable[]) => {
            this.timeTableWeekListByWeek = weekList;
          },
          (error) => console.log(error)
        );
    } else {
      this.timeTableService.getListOfTimeTableWeekBySemIdAndAllWeeks(this.semesterId )
        .subscribe(
          (weekList: TimeTable[]) => {
            this.timeTableWeekListByWeek = weekList;
          },
          (error) => console.log(error)
        );
    }

  }
}
