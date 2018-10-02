import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Lecture} from '../models/Lecture.model';
import {Semester} from '../models/Semester.model';
import {Day} from '../models/Day.model';
import {Time} from '../models/Time.model';
import {LectureHall} from '../models/LectureHall.model';
import {Course} from '../models/Course.model';
import {CourseService} from './course.service';
import {TokenService} from './token.service';
import {Token} from '../models/Token.model';

@Injectable({
  providedIn: 'root'
})
export class MesagingService {
tokenList: Token[] = [];
    constructor(private http: HttpClient,
                private tokenService: TokenService) {
        this.tokenService.getListofTokens()
            .subscribe(
                (tokenList: Token[]) => {
                    this.tokenList = tokenList;
                    console.log('this is the token List0');
                    console.log(this.tokenList);
                },
                (error) => console.log(error)
            );
    }
    sendNotificationMessages(lecture: Lecture, semester: Semester, date: Day,
                 startTime: Time, endTime: Time, hall: LectureHall,
                 course: Course) {
        const url2 = 'https://fcm.googleapis.com/fcm/send';
        /*const headers = new HttpHeaders({
            'Authorization': 'key=AAAA8WvGAe0:AP' +
            'A91bEeJwSAyOa3yeE397BpWEsrVR5ZtRmTIG' +
            'iqz1cGvLvCmm-b6aEh4B7gVWsHJjVcuuRMo_GvaqjEGBKLwzn3_9-Qzdiw5Ir1-_74GQl7Xa1Hp_BVy5BNcFtAuMAS4KEHslZHBpYf',
            'Content-Type': 'application/json'
        });*/
        // Sending notifications
        for (const list of this.tokenList) {
            return this.http.post
            (url2, {
                'notification': {
                    'title': ' Extra Lecture for ' + semester.semesterName,
                    'body': 'New Lecture added for ' + semester.semesterName + ' regarding ' +
                    course.courseName + ' on ' + date.day + ' at ' + startTime.time +
                    ' to ' + endTime.time + ' in ' + hall.name + '.',
                },
                'to': list.token
            }, {
                headers: new HttpHeaders
                ({
                    'Authorization': 'key=AAAA8WvGAe0:AP' +
                    'A91bEeJwSAyOa3yeE397BpWEsrVR5ZtRmTIG' +
                    'iqz1cGvLvCmm-b6aEh4B7gVWsHJjVcuuRMo_GvaqjEGBKLwzn3_9-Qzdiw5Ir1-_74GQl7Xa1Hp_BVy5BNcFtAuMAS4KEHslZHBpYf',
                    'Content-Type': 'application/json'
                })
            });
        }
    }
    sendNotificationMessagesCancel(lecture: Lecture, semester: Semester, date: Day,
                             startTime: Time, endTime: Time, hall: LectureHall,
                             course: Course) {
        const url2 = 'https://fcm.googleapis.com/fcm/send';
        /*const headers = new HttpHeaders({
            'Authorization': 'key=AAAA8WvGAe0:AP' +
            'A91bEeJwSAyOa3yeE397BpWEsrVR5ZtRmTIG' +
            'iqz1cGvLvCmm-b6aEh4B7gVWsHJjVcuuRMo_GvaqjEGBKLwzn3_9-Qzdiw5Ir1-_74GQl7Xa1Hp_BVy5BNcFtAuMAS4KEHslZHBpYf',
            'Content-Type': 'application/json'
        });*/
        // Sending notifications
        for (const list of this.tokenList) {
            return this.http.post
            (url2, {
                'notification': {
                    'title': ' Lecture canceled for ' + semester.semesterName,
                    'body': 'Lecture canceled for ' + semester.semesterName + ' regarding ' +
                    course.courseName + ' on ' + date.day + ' at ' + startTime.time +
                    ' to ' + endTime.time + ' in ' + hall.name + '.',
                },
                'to': list.token
            }, {
                headers: new HttpHeaders
                ({
                    'Authorization': 'key=AAAA8WvGAe0:AP' +
                    'A91bEeJwSAyOa3yeE397BpWEsrVR5ZtRmTIG' +
                    'iqz1cGvLvCmm-b6aEh4B7gVWsHJjVcuuRMo_GvaqjEGBKLwzn3_9-Qzdiw5Ir1-_74GQl7Xa1Hp_BVy5BNcFtAuMAS4KEHslZHBpYf',
                    'Content-Type': 'application/json'
                })
            });
        }
    }
    sendTwilioMessages(lecture: Lecture, semester: Semester, date: Day,
                             startTime: Time, endTime: Time, hall: LectureHall,
                             course: Course) {
        // Sending Twilio Messages
        const url = '/api/messages/send/' + lecture.fullName + '/' + semester.semesterName + '/' + date.day + '/'
            + startTime.time + '/'
            + endTime.time + '/'
            + hall.name + '/'
            + course.courseName + '/';
        return this.http.get
        (url);
    }
}

