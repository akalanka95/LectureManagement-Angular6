import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../services/student.service';
import {LectureService} from '../services/lecture.service';
import {Lecture} from '../models/Lecture.model';
import {MessagingService} from '../messaging.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

    message;
    lecturesList: Lecture [] = [];
  constructor(private lectureService: LectureService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.lectureService.getListOfLectures()
          .subscribe(
              (lectures: any[]) => {
                  this.lecturesList = lectures;
              },
              (error) => console.log(error)
          )
  }
    saveAttendance() {
    console.log(this.lecturesList);
        this.lectureService.updateLectureList(this.lecturesList)
            .subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
            );
    }
}
