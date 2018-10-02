import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TimeTable} from '../../models/TimeTable.model';
import {TimeTableService} from '../../services/time-table.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  isLoaded = false;
  semesterId = 2;
  time = '8:00';
  week = true;
  timeTableWeek: TimeTable [] = [];
  timeTableNextWeek: TimeTable [] = [];
  next = false;
  constructor(private timeTableService: TimeTableService,
              private router: Router,
              private route: ActivatedRoute) { this.loadScripts(); }
  loadScripts() {
    const dynamicScripts = [
      'https://platform.twitter.com/widgets.js',
      'assets/js/jquery-3.0.0.min.js',
      'assets/js/main.js',
      'assets/js/modernizr.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
    this.isLoaded = true;
  }
  ngOnInit() {
    this.semesterId = +this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params: Params) => {
        this.semesterId = +params['id'];
      }
    );
    this.timeTableService.getListOfTimeTablesBySemester(this.semesterId)
      .subscribe(
        (timeTables: TimeTable[]) => {
          /*this.timeTablesList = timeTables;*/
          for (const timeTable of timeTables) {
            if (timeTable.tWeek === true) {
              this.timeTableWeek.push(timeTable);
            }
            if ( timeTable.nWeek === true) {
              this.timeTableNextWeek.push(timeTable);
            }
          }
        },
        (error) => console.log(error)
      );
  }
  selectWeek(weekNo: number) {
    if (weekNo === 1) {
      this.loadScripts();
      this.next = false;
      this.week = true;
      /*this.timeTablesList = this.timeTableWeek;*/
    } else {
      this.loadScripts();
      this.next = true;
      this.week = false;
      /*this.timeTablesList = this.timeTableNextWeek;*/
    }
  }

}
