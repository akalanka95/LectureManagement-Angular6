import { Component, OnInit } from '@angular/core';
import {LectureService} from '../../services/lecture.service';
import {Lecture} from '../../models/Lecture.model';
import {TimeTableService} from '../../services/time-table.service';
import {TimeTable} from '../../models/TimeTable.model';

@Component({
  selector: 'app-lecture-time',
  templateUrl: './lecture-time.component.html',
  styleUrls: ['./lecture-time.component.scss']
})
export class LectureTimeComponent implements OnInit {

    lectureList: Lecture[] = [];
    timeTableList: TimeTable[] = [];
    timeLecture: Lecture;
    chartShow = false;

    constructor(private lectureService: LectureService,
                private timeTableService: TimeTableService) {
        this.loadScripts();
    }

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
    }

    ngOnInit() {
        this.lectureService.getListOfLectures()
            .subscribe(
                (lectureList: any[]) => {
                    this.lectureList = lectureList;
                },
                (error) => console.log(error)
            );
    }

    selectLectures(lectures: Lecture) {
        this.chartShow =  false;
        this.timeLecture = lectures;
        this.timeTableService.getListOfTimeTablesByLectureId(lectures.id)
                    .subscribe(
                        (timeTableList: TimeTable[]) => {
                            this.timeTableList = timeTableList;
                            setTimeout(() => {
                                    this.loadScripts();
                                    this.chartShow = true;
                                },
                                5000);
                        },
                        (error) => console.log(error)
                    );
     }
}

