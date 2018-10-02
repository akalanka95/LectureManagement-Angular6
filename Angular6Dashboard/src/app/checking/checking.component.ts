import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LectureService} from '../services/lecture.service';
import {TimeTableService} from '../services/time-table.service';
import {TimeTable} from '../models/TimeTable.model';
import {int} from 'flatpickr/dist/utils';
import {DayService} from '../services/day.service';
import {Day} from '../models/Day.model';
import {SemesterService} from '../services/semester.service';
import {Semester} from '../models/Semester.model';
import {CourseService} from '../services/course.service';
import {Course} from '../models/Course.model';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.scss']
})
export class CheckingComponent implements OnInit {
    ngOnInit(): void {
    }
}


