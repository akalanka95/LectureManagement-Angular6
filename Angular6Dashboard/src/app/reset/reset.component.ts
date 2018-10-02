import { Component, OnInit } from '@angular/core';
import {LectureService} from '../services/lecture.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../services/department.service';
import {TimeTableService} from '../services/time-table.service';
import {TimeTable} from '../models/TimeTable.model';
import {WeekService} from '../services/week.service';
import {Week} from '../models/Week.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  timeTableList: TimeTable[] = [];
  weekList: Week[] = [];
  weekId: number;
  weekIdNew: number;

  constructor(private lectureService: LectureService,
              private departmentService: DepartmentService,
              private timeTableService: TimeTableService,
              private weekService: WeekService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
      this.weekService.findWeek()
          .subscribe(
              (week: Week[]) => {
                  this.weekList = week;
              },
              (error) => console.log(error)
          );
      this.timeTableService.getListOfTimeTables()
          .subscribe(
              (timeTableList: TimeTable[]) => {
                  this.timeTableList = timeTableList;
              },
              (error) => console.log(error)
          );
  }
  reset() {
      for ( const list of this.weekList) {
          if ( list.active === true) {
              this.weekId = list.id;
              list.active = false;
          }
          if ( list.id === this.weekId + 1) {
              list.active = true;
          }
      }
      this.weekService.saveWeek(this.weekList)
          .subscribe(
              (weekList: Week[]) => {
                  console.log(weekList)
              },
              (error) => console.log(error)
          );
      for (const list of this.timeTableList) {
          list.id = null;
          list.weekId = this.weekId;
      }
      this.timeTableService.saveTimeTableweek(this.timeTableList)
          .subscribe(
              (timeTableList: TimeTable[]) => {
                  this.timeTableList = timeTableList;
              },
              (error) => console.log(error)
          );
  }
}
