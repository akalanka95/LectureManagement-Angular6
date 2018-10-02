import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TimeTableService} from '../../services/time-table.service';
import {TimeTable} from '../../models/TimeTable.model';
import {Message} from '../../models/Message.model';
import {SendMessageService} from '../../services/send-message.service';
import {MesagingService} from '../../services/mesaging.service';

@Component({
  selector: 'app-semester-cancel',
  templateUrl: './semester-cancel.component.html',
  styleUrls: ['./semester-cancel.component.scss']
})
export class SemesterCancelComponent implements OnInit {
    isLoaded = false;
    semesterId = 2;
    time = '8:00';
    buttonThisWeek = true;
    buttonNextWeek = false;
    timeTableWeek: TimeTable [] = [];
    timeTableNextWeek: TimeTable [] = [];
    newMessage = new Message();
    cancelTimeTable: TimeTable;
    constructor(private timeTableService: TimeTableService,
                private sendMessageService: SendMessageService,
                private messagingService: MesagingService,
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
                this.semesterId = +params['id']
            }
        );
        this.timeTableService.getListOfTimeTablesBySemester(this.semesterId)
            .subscribe(
                (timeTables: TimeTable[]) => {
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
            )
    }
    selectWeek (weekNo: number) {
        if (weekNo === 1) {
            // This Week
            this.loadScripts();
            this.buttonThisWeek = true;
            this.buttonNextWeek = false;
        } else {
            this.loadScripts();
            this.buttonThisWeek = false;
            this.buttonNextWeek = true;
        }
    }
    cancelLecture (timeTable: TimeTable) {
        this.cancelTimeTable = timeTable;
        timeTable.tWeek = false;
        this.timeTableService.postNewTimeTable(timeTable)
            .subscribe(
                (timeTables: TimeTable) => {
                    console.log(timeTables)
                },
                (error) => console.log(error)
            );
        this.newMessage.message = 'Lecture Canceled for ' + this.cancelTimeTable.semester.semesterName + ' regarding ' +
            this.cancelTimeTable.course.courseName + ' on ' + this.cancelTimeTable.date.day + ' at ' + this.cancelTimeTable.startTime.time +
            ' to ' + this.cancelTimeTable.endTime.time + ' in ' + this.cancelTimeTable.lectureHall.name + '.' ;
        this.newMessage.type = 'send';
        this.newMessage.lecture = this.cancelTimeTable.lecture;
        this.sendMessageService.saveMessage(this.newMessage)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (error) => console.log(error)
            );
        this.messagingService.sendNotificationMessagesCancel(this.cancelTimeTable.lecture , this.cancelTimeTable.semester,
            this.cancelTimeTable.date , this.cancelTimeTable.startTime, this.cancelTimeTable.endTime,
            this.cancelTimeTable.lectureHall , this.cancelTimeTable.course)
            .subscribe(
                (res) => {
                    console.log(res);
                    console.log('button works 222');
                },
                (error) => console.log(error)
            );
    }

}
