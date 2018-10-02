import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TimeTableService} from '../../services/time-table.service';
import {TimeTable} from '../../models/TimeTable.model';
import {DayService} from '../../services/day.service';
import {Day} from '../../models/Day.model';
import {MesagingService} from '../../services/mesaging.service';
import {LectureService} from '../../services/lecture.service';
import {SemesterService} from '../../services/semester.service';
import {Lecture} from '../../models/Lecture.model';
import {Semester} from '../../models/Semester.model';
import {Course} from '../../models/Course.model';
import {Time} from '../../models/Time.model';
import {CourseService} from '../../services/course.service';
import {LectureHallService} from '../../services/lecture-hall.service';
import {LectureHall} from '../../models/LectureHall.model';
import {TimeService} from '../../services/time.service';
import {Message} from '../../models/Message.model';
import {SendMessageService} from '../../services/send-message.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
    monday = false;
    tuesday = false;
    wednesday = false;
    thursday = false;
    friday = false;
    hall1 = false;
    hall2 = false;
    hall3 = false;
    hall4 = false;
    hall5 = false;
    hall6 = false;
    timeList = [{time: '0:00' , id: 0}];
    isLoaded = false;
    lectureId: number;
    semesterId: number;
    courseId: number;
    semesterName: string;
    lectureName: string;
    subjectName: string;
    timeTableList: TimeTable[] = [];
    timeTableListNextWeek: TimeTable[] = [];
    timeTableListWeek: TimeTable[] = [];
    freeMondayList: Array<number> = [];
    freeTuesdayList: Array<number> = [];
    freeWednesdayList: Array<number> = [];
    freeThursdayList: Array<number> = [];
    freeFridayList: Array<number> = [];
    dayListBydate: TimeTable[] = [];
    timeNumber: Array<number> = [];
    freeHallList1: Array<number> = [];
    freeHallList2: Array<number> = [];
    freeHallList3: Array<number> = [];
    freeHallList4: Array<number> = [];
    freeHallList5: Array<number> = [];
    freeHallList6: Array<number> = [];
    dayList: Day[] = [];
    selectTimeList = [{start: '0:00' , end: '0:00'}];
    freeLectureHallList = [{name: 'hall' , id: 1 }];
    /*freeMondayListTest: Array<number> = [2 , 3, 5, 6, 7 , 9, 11, 12, 15];
    timeList: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8 , 9, 10, 11, 12, 13, 14, 15];
    freeMondayTimeList = [{start: '8:00' , end: '9:00'}, {start: '10:00' , end: '12:00'} , {start: '13:00' , end: '13:30'}];
   */
    freeMonday = [{start: 0 , end: 0}];
    freeTuesday = [{start: 0 , end: 0}];
    freeWednesday = [{start: 0 , end: 0}];
    freeThursday = [{start: 0 , end: 0}];
    freeFriday = [{start: 0 , end: 0}];
    freeHall1 = [{start: 0 , end: 0}];
    freeHall2 = [{start: 0 , end: 0}];
    freeHall3 = [{start: 0 , end: 0}];
    freeHall4 = [{start: 0 , end: 0}];
    freeHall5 = [{start: 0 , end: 0}];
    freeHall6 = [{start: 0 , end: 0}];
    freeMondayTest = [{start: '0:00' , end: '0:00'}];
    freeTuesdayTest = [{start: '0:00' , end: '0:00'}];
    freeWednesdayTest = [{start: '0:00' , end: '0:00'}];
    freeThursdayTest = [{start: '0:00' , end: '0:00'}];
    freeFridayTest = [{start: '0:00' , end: '0:00'}];
    freeHallTest = [{start: 0 , end: 0}];
    checkList = [{id: 1 , time: '8:00'} ,
        {id: 2 , time: '8:30'},
        {id: 3 , time: '9:00'},
        {id: 4 , time: '9:30'},
        {id: 5 , time: '10:00'},
        {id: 6 , time: '10:30'},
        {id: 7 , time: '11:00'},
        {id: 8 , time: '11:30'},
        {id: 9 , time: '12:00'},
        {id: 10 , time: '12:30'},
        {id: 11 , time: '13:00'},
        {id: 12 , time: '13:30'},
        {id: 13 , time: '14:00'},
        {id: 14 , time: '14:30'},
        {id: 15 , time: '15:00'},
        {id: 16 , time: '15:30'},
        {id: 17 , time: '16:00'},
        {id: 18 , time: '16:30'},
        {id: 19 , time: '17:00'},
    ];
    addActive: boolean;
    addState: string;
    addDate: Day;
    addCourse: Course;
    addSemester: Semester;
    addStartTime: Time;
    addEndTime: Time;
    adLecture: Lecture;
    addTWeek: boolean;
    addNWeek: boolean;
    addHall: LectureHall;
    timeTableObject: TimeTable = new TimeTable();
    buttonDay = false;
    buttonFree = false;
    buttonHall = false;
    buttonStart = false;
    buttonEnd = false;
    buttonActive = false;
    buttonThisWeek = true;
    buttonNextWeek = false;
    newMessage = new Message();
    constructor(private timeTableService: TimeTableService,
                private dayService: DayService,
                private lectureService: LectureService,
                private semesterService: SemesterService,
                private courseService: CourseService,
                private messagingService: MesagingService,
                private lectureHallService: LectureHallService,
                private sendMessageService: SendMessageService,
                private timeService: TimeService,
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
        this.semesterId = +this.route.snapshot.params['semId'];
        this.lectureId = +this.route.snapshot.params['lecId'];
        this.courseId = +this.route.snapshot.params['couId'];
        this.route.params.subscribe(
            (params: Params) => {
                this.semesterId = +params['semId'];
                this.lectureId = +params['lecId'];
                this.courseId = +params['couId'];
            }
        );
        this.timeTableService.getListOfTimeTableBySemesterORLecture(this.semesterId, this.lectureId)
            .subscribe(
                (timeTableList: TimeTable[]) => {
                    this.timeTableList = timeTableList;
                    for (const list of this.timeTableList) {
                        if (list.tWeek === true ) {
                            this.timeTableListWeek.push(list);
                        }
                        if (list.nWeek === true) {
                            this.timeTableListNextWeek.push(list);
                        }
                    }
                    this.selectTimeTableList(1);
                },
                (error) => console.log(error)
            );
        this.courseService.getCourse(this.courseId)
            .subscribe(
                (course: Course) => {
                    this.addCourse = course;
                    this.subjectName = course.courseName;
                },
                (error) => console.log(error)
            );
        this.lectureService.getLecture(this.lectureId)
            .subscribe(
                (lecture: Lecture) => {
                    this.adLecture = lecture;
                    this.lectureName = lecture.fullName;
                },
                (error) => console.log(error)
            );
        this.semesterService.getSemester(this.semesterId)
            .subscribe(
                (semester: Semester) => {
                    this.addSemester = semester;
                    this.semesterName = semester.semesterName;
                },
                (error) => console.log(error)
            );
        /*this.timeTableService.getListOfTimeTableBySemesterORLecture(this.semesterId, this.lectureId)
            .subscribe(
                (timeTableList: TimeTable[]) => {
                    console.log('timeTable List');
                    console.log('timeTable List');
                    console.log('timeTable List');
                    console.log(timeTableList);
                    this.timeTableList = timeTableList;
                    for (const list of this.timeTableList) {
                        if (list.date.day === 'Monday') {
                            this.monday = true;
                            const num10 = list.endTime.id - list.startTime.id;
                            let start = list.startTime.id;
                            this.freeMondayList.push(start);
                            for (let i = 1; i <= num10; i++) {
                                start = start + i;
                                this.freeMondayList.push(start);
                                start = list.startTime.id;
                            }
                        }
                        if (list.date.day === 'Tuesday') {
                            this.tuesday = true;
                            const num6 = list.endTime.id - list.startTime.id;
                            let start = list.startTime.id;
                            this.freeTuesdayList.push(start);
                            for (let i = 1; i <= num6; i++) {
                                start = start + i;
                                this.freeTuesdayList.push(start);
                                start = list.startTime.id;
                            }
                        }
                        if (list.date.day === 'Wednesday') {
                            this.wednesday = true;
                            const num7 = list.endTime.id - list.startTime.id;
                            let start = list.startTime.id;
                            this.freeWednesdayList.push(start);
                            for (let i = 1; i <= num7; i++) {
                                start = start + i;
                                this.freeWednesdayList.push(start);
                                start = list.startTime.id;
                            }
                        }
                        if (list.date.day === 'Thursday') {
                            this.thursday = true;
                            const num8 = list.endTime.id - list.startTime.id;
                            let start = list.startTime.id;
                            this.freeThursdayList.push(start);
                            for (let i = 1; i <= num8; i++) {
                                start = start + i;
                                this.freeThursdayList.push(start);
                                start = list.startTime.id;
                            }
                        }
                        if (list.date.day === 'Friday') {
                            this.friday = true;
                            const num9 = list.endTime.id - list.startTime.id;
                            let start = list.startTime.id;
                            this.freeFridayList.push(start);
                            for (let i = 1; i <= num9; i++) {
                                start = start + i;
                                this.freeFridayList.push(start);
                                start = list.startTime.id;
                            }
                        }
                    }
                    // Monday
                    if (this.monday === true) {
                        this.freeMondayList.sort(numberAs);
                        let num1 = this.freeMondayList[0];
                        if (num1 !== 1) {
                            this.freeMonday.push({start: 1 , end: num1});
                        }
                        for (const list of this.freeMondayList) {
                            const num11 = list - num1;
                            if (num11 !== 0 && num11 !== 1 ) {
                                const starts = num1;
                                const ends = list;
                                this.freeMonday.push({start: starts , end: ends});
                            }
                            num1 = list;
                        }
                        const lastIndex1 = this.freeMondayList[this.freeMondayList.length - 1];
                        if (lastIndex1 !== 19) {
                            this.freeMonday.push({start: lastIndex1 , end: 19});
                        }

                        for ( const list of this.freeMonday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeMondayTest.push({start: start1 , end: end1});
                        }
                        } else {
                        this.freeMondayTest.push({start: '08:00' , end: '17:00'});
                    }
                    // Tuesday
                    if (this.tuesday === true) {
                        this.freeTuesdayList.sort(numberAs);

                        let num2 = this.freeTuesdayList[0];
                        if (num2 !== 1) {
                            this.freeTuesday.push({start: 1 , end: num2});
                        }
                        for (const list of this.freeTuesdayList) {
                            const num12 = list - num2;
                            if (num12 !== 0 && num12 !== 1 ) {
                                const starts = num2;
                                const ends = list;
                                this.freeTuesday.push({start: starts , end: ends});
                            }
                            num2 = list;
                        }
                        const lastIndex2 = this.freeTuesdayList[this.freeTuesdayList.length - 1];
                        if (lastIndex2 !== 19) {
                            this.freeTuesday.push({start: lastIndex2 , end: 19});
                        }

                        for ( const list of this.freeTuesday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeTuesdayTest.push({start: start1 , end: end1});
                        }
                        } else {
                        this.freeTuesdayTest.push({start: '8:00' , end: '17:00'});
                    }
                    // Wednesday
                    if (this.wednesday === true) {
                        this.freeWednesdayList.sort(numberAs);

                        let num3 = this.freeWednesdayList[0];
                        if (num3 !== 1) {
                            this.freeWednesday.push({start: 1 , end: num3});
                        }
                        for (const list of this.freeWednesdayList) {
                            const num13 = list - num3;
                            if (num13 !== 0 && num13 !== 1 ) {
                                const starts = num3;
                                const ends = list;
                                this.freeWednesday.push({start: starts , end: ends});
                            }
                            num3 = list;
                        }
                        const lastIndex3 = this.freeWednesdayList[this.freeWednesdayList.length - 1];
                        if (lastIndex3 !== 19) {
                            this.freeWednesday.push({start: lastIndex3 , end: 19});
                        }

                        for ( const list of this.freeWednesday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeWednesdayTest.push({start: start1 , end: end1});
                        }
                    } else {
                        this.freeWednesdayTest.push({start: '8:00' , end: '17:00'});
                    }
                    // Thursday
                    if (this.thursday ===  true) {

                        this.freeThursdayList.sort(numberAs);

                        let num4 = this.freeThursdayList[0];
                        if (num4 !== 1) {
                            this.freeThursday.push({start: 1 , end: num4});
                        }
                        for (const list of this.freeThursdayList) {
                            const num14 = list - num4;
                            if (num14 !== 0 && num14 !== 1 ) {
                                const starts = num4;
                                const ends = list;
                                this.freeThursday.push({start: starts , end: ends});
                            }
                            num4 = list;
                        }
                        const lastIndex4 = this.freeThursdayList[this.freeThursdayList.length - 1];
                        if (lastIndex4 !== 19) {
                            this.freeThursday.push({start: lastIndex4 , end: 19});
                        }

                        for ( const list of this.freeThursday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeThursdayTest.push({start: start1 , end: end1});
                        }
                    } else {
                        this.freeThursdayTest.push({start: '8:00' , end: '17:00'});
                    }
                    // Friday
                    if (this.friday === true) {

                        this.freeFridayList.sort(numberAs);

                        let num5 = this.freeFridayList[0];
                        if (num5 !== 1) {
                            this.freeFriday.push({start: 1 , end: num5});
                        }
                        for (const list of this.freeFridayList) {
                            const num15 = list - num5;
                            if (num15 !== 0 && num15 !== 1 ) {
                                const starts = num5;
                                const ends = list;
                                this.freeFriday.push({start: starts , end: ends});
                            }
                            num5 = list;
                        }
                        const lastIndex5 = this.freeFridayList[this.freeFridayList.length - 1];
                        if (lastIndex5 !== 19) {
                            this.freeFriday.push({start: lastIndex5 , end: 19});
                        }

                        for ( const list of this.freeFriday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeFridayTest.push({start: start1 , end: end1});
                        }
                    } else {
                        this.freeFridayTest.push({start: '8:00' , end: '17:00'});
                    }
                },
                (error) => console.log(error)
            );

        function numberAs(a, b) {
            return a - b;
        }*/
        this.dayService.getListOfDays()
            .subscribe(
                (dayList: any[]) => {
                    this.dayList = dayList;
                },
                (error) => console.log(error)
            )
    }
    selectTimeTableList (weekId: number) {
                    if (weekId === 1) {
                        for (const list of this.timeTableListWeek) {
                            if (list.date.day === 'Monday') {
                                this.monday = true;
                                const num10 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeMondayList.push(start);
                                for (let i = 1; i <= num10; i++) {
                                    start = start + i;
                                    this.freeMondayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                            if (list.date.day === 'Tuesday') {
                                this.tuesday = true;
                                const num6 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeTuesdayList.push(start);
                                for (let i = 1; i <= num6; i++) {
                                    start = start + i;
                                    this.freeTuesdayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                            if (list.date.day === 'Wednesday') {
                                this.wednesday = true;
                                const num7 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeWednesdayList.push(start);
                                for (let i = 1; i <= num7; i++) {
                                    start = start + i;
                                    this.freeWednesdayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                            if (list.date.day === 'Thursday') {
                                this.thursday = true;
                                const num8 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeThursdayList.push(start);
                                for (let i = 1; i <= num8; i++) {
                                    start = start + i;
                                    this.freeThursdayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                            if (list.date.day === 'Friday') {
                                this.friday = true;
                                const num9 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeFridayList.push(start);
                                for (let i = 1; i <= num9; i++) {
                                    start = start + i;
                                    this.freeFridayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                        }
                    }
                    if (weekId === 2) {
                        for (const list of this.timeTableListNextWeek) {
                            if (list.date.day === 'Monday') {
                                this.monday = true;
                                const num10 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeMondayList.push(start);
                                for (let i = 1; i <= num10; i++) {
                                    start = start + i;
                                    this.freeMondayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                            if (list.date.day === 'Tuesday') {
                                this.tuesday = true;
                                const num6 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeTuesdayList.push(start);
                                for (let i = 1; i <= num6; i++) {
                                    start = start + i;
                                    this.freeTuesdayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                            if (list.date.day === 'Wednesday') {
                                this.wednesday = true;
                                const num7 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeWednesdayList.push(start);
                                for (let i = 1; i <= num7; i++) {
                                    start = start + i;
                                    this.freeWednesdayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                            if (list.date.day === 'Thursday') {
                                this.thursday = true;
                                const num8 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeThursdayList.push(start);
                                for (let i = 1; i <= num8; i++) {
                                    start = start + i;
                                    this.freeThursdayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                            if (list.date.day === 'Friday') {
                                this.friday = true;
                                const num9 = list.endTime.id - list.startTime.id;
                                let start = list.startTime.id;
                                this.freeFridayList.push(start);
                                for (let i = 1; i <= num9; i++) {
                                    start = start + i;
                                    this.freeFridayList.push(start);
                                    start = list.startTime.id;
                                }
                            }
                        }
                    }
                    // Monday
                    if (this.monday === true) {
                        this.freeMondayList.sort(numberAs);
                        let num1 = this.freeMondayList[0];
                        if (num1 !== 1) {
                            this.freeMonday.push({start: 1 , end: num1});
                        }
                        for (const list of this.freeMondayList) {
                            const num11 = list - num1;
                            if (num11 !== 0 && num11 !== 1 ) {
                                const starts = num1;
                                const ends = list;
                                this.freeMonday.push({start: starts , end: ends});
                            }
                            num1 = list;
                        }
                        const lastIndex1 = this.freeMondayList[this.freeMondayList.length - 1];
                        if (lastIndex1 !== 19) {
                            this.freeMonday.push({start: lastIndex1 , end: 19});
                        }

                        for ( const list of this.freeMonday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeMondayTest.push({start: start1 , end: end1});
                        }
                    } else {
                        this.freeMondayTest.push({start: '08:00' , end: '17:00'});
                    }
                    // Tuesday
                    if (this.tuesday === true) {
                        this.freeTuesdayList.sort(numberAs);

                        let num2 = this.freeTuesdayList[0];
                        if (num2 !== 1) {
                            this.freeTuesday.push({start: 1 , end: num2});
                        }
                        for (const list of this.freeTuesdayList) {
                            const num12 = list - num2;
                            if (num12 !== 0 && num12 !== 1 ) {
                                const starts = num2;
                                const ends = list;
                                this.freeTuesday.push({start: starts , end: ends});
                            }
                            num2 = list;
                        }
                        const lastIndex2 = this.freeTuesdayList[this.freeTuesdayList.length - 1];
                        if (lastIndex2 !== 19) {
                            this.freeTuesday.push({start: lastIndex2 , end: 19});
                        }

                        for ( const list of this.freeTuesday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeTuesdayTest.push({start: start1 , end: end1});
                        }
                    } else {
                        this.freeTuesdayTest.push({start: '8:00' , end: '17:00'});
                    }
                    // Wednesday
                    if (this.wednesday === true) {
                        this.freeWednesdayList.sort(numberAs);

                        let num3 = this.freeWednesdayList[0];
                        if (num3 !== 1) {
                            this.freeWednesday.push({start: 1 , end: num3});
                        }
                        for (const list of this.freeWednesdayList) {
                            const num13 = list - num3;
                            if (num13 !== 0 && num13 !== 1 ) {
                                const starts = num3;
                                const ends = list;
                                this.freeWednesday.push({start: starts , end: ends});
                            }
                            num3 = list;
                        }
                        const lastIndex3 = this.freeWednesdayList[this.freeWednesdayList.length - 1];
                        if (lastIndex3 !== 19) {
                            this.freeWednesday.push({start: lastIndex3 , end: 19});
                        }

                        for ( const list of this.freeWednesday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeWednesdayTest.push({start: start1 , end: end1});
                        }
                    } else {
                        this.freeWednesdayTest.push({start: '8:00' , end: '17:00'});
                    }
                    // Thursday
                    if (this.thursday ===  true) {

                        this.freeThursdayList.sort(numberAs);

                        let num4 = this.freeThursdayList[0];
                        if (num4 !== 1) {
                            this.freeThursday.push({start: 1 , end: num4});
                        }
                        for (const list of this.freeThursdayList) {
                            const num14 = list - num4;
                            if (num14 !== 0 && num14 !== 1 ) {
                                const starts = num4;
                                const ends = list;
                                this.freeThursday.push({start: starts , end: ends});
                            }
                            num4 = list;
                        }
                        const lastIndex4 = this.freeThursdayList[this.freeThursdayList.length - 1];
                        if (lastIndex4 !== 19) {
                            this.freeThursday.push({start: lastIndex4 , end: 19});
                        }

                        for ( const list of this.freeThursday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeThursdayTest.push({start: start1 , end: end1});
                        }
                    } else {
                        this.freeThursdayTest.push({start: '8:00' , end: '17:00'});
                    }
                    // Friday
                    if (this.friday === true) {

                        this.freeFridayList.sort(numberAs);

                        let num5 = this.freeFridayList[0];
                        if (num5 !== 1) {
                            this.freeFriday.push({start: 1 , end: num5});
                        }
                        for (const list of this.freeFridayList) {
                            const num15 = list - num5;
                            if (num15 !== 0 && num15 !== 1 ) {
                                const starts = num5;
                                const ends = list;
                                this.freeFriday.push({start: starts , end: ends});
                            }
                            num5 = list;
                        }
                        const lastIndex5 = this.freeFridayList[this.freeFridayList.length - 1];
                        if (lastIndex5 !== 19) {
                            this.freeFriday.push({start: lastIndex5 , end: 19});
                        }

                        for ( const list of this.freeFriday) {
                            let start1 = '0:00';
                            let end1 = '0:00';
                            for (const check of this.checkList) {
                                if ( list.start === check.id) {
                                    start1 = check.time;
                                }
                                if ( list.end === check.id ) {
                                    end1 = check.time;
                                }
                            }
                            this.freeFridayTest.push({start: start1 , end: end1});
                        }
                    } else {
                        this.freeFridayTest.push({start: '8:00' , end: '17:00'});
                    }
        function numberAs(a, b) {
            return a - b;
        }
    }
    selectDay(days: Day) {
        this.buttonDay = true;
        this.addDate = days;
        // Monday
        if (days.day === 'Monday') {
             this.selectTimeList = [{start: '0:00' , end: '0:00'}];
            for (const date of this.freeMondayTest) {
                this.selectTimeList.push(date);
            }
        }
        // Tuesday
        if (days.day === 'Tuesday') {
            this.selectTimeList = [{start: '0:00' , end: '0:00'}];
            for (const date of this.freeTuesdayTest) {
                this.selectTimeList.push(date);
            }
        }
        // Wednesday
        if (days.day === 'Wednesday') {
            this.selectTimeList = [{start: '0:00' , end: '0:00'}];
            for (const date of this.freeWednesdayTest) {
                this.selectTimeList.push(date);
            }
        }
        // Thursday
        if (days.day === 'Thursday') {
            this.selectTimeList = [{start: '0:00' , end: '0:00'}];
            for (const date of this.freeThursdayTest) {
                this.selectTimeList.push(date);
            }
        }
        // Friday
        if (days.day === 'Friday') {
            this.selectTimeList = [{start: '0:00' , end: '0:00'}];
            for (const date of this.freeFridayTest) {
                this.selectTimeList.push(date);
            }
        }

        this.timeTableService.getListOfTimeTableByDay(days.id)
            .subscribe(
                (dateList: any[]) => {
                    this.dayListBydate = dateList;
                    console.log(this.dayListBydate);
                    for (const list of this.dayListBydate) {
                        // LT-104
                        if (list.lectureHall.name === 'LT-104') {
                            this.hall1 = true;
                            const num6 = list.endTime.id - list.startTime.id;
                            let start6 = list.startTime.id;
                            this.freeHallList1.push(start6);
                            for (let i = 1; i <= num6; i++) {
                                start6 = start6 + i;
                                this.freeHallList1.push(start6);
                                start6 = list.startTime.id;
                            }
                        }
                        // LT-105
                        if (list.lectureHall.name === 'LT-105') {
                            this.hall2 = true;
                            const num6 = list.endTime.id - list.startTime.id;
                            let start6 = list.startTime.id;
                            this.freeHallList2.push(start6);
                            for (let i = 1; i <= num6; i++) {
                                start6 = start6 + i;
                                this.freeHallList2.push(start6);
                                start6 = list.startTime.id;
                            }
                        }
                        // LT-202
                        if (list.lectureHall.name === 'LT-202') {
                            this.hall3 =  true;
                            const num6 = list.endTime.id - list.startTime.id;
                            let start6 = list.startTime.id;
                            this.freeHallList3.push(start6);
                            for (let i = 1; i <= num6; i++) {
                                start6 = start6 + i;
                                this.freeHallList3.push(start6);
                                start6 = list.startTime.id;
                            }
                        }
                        // z-9
                        if (list.lectureHall.name === 'Z-9') {
                            this.hall4 = true;
                            const num6 = list.endTime.id - list.startTime.id;
                            let start6 = list.startTime.id;
                            this.freeHallList4.push(start6);
                            for (let i = 1; i <= num6; i++) {
                                start6 = start6 + i;
                                this.freeHallList4.push(start6);
                                start6 = list.startTime.id;
                            }
                        }
                        // NLH
                        if (list.lectureHall.name === 'NLH') {
                            this.hall5 = true;
                            const num6 = list.endTime.id - list.startTime.id;
                            let start6 = list.startTime.id;
                            this.freeHallList5.push(start6);
                            for (let i = 1; i <= num6; i++) {
                                start6 = start6 + i;
                                this.freeHallList5.push(start6);
                                start6 = list.startTime.id;
                            }
                        }
                        // CIS Lab
                        if (list.lectureHall.name === 'CIS Lab') {
                            this.hall6 = true;
                            const num6 = list.endTime.id - list.startTime.id;
                            let start6 = list.startTime.id;
                            this.freeHallList6.push(start6);
                            for (let i = 1; i <= num6; i++) {
                                start6 = start6 + i;
                                this.freeHallList6.push(start6);
                                start6 = list.startTime.id;
                            }
                        }
                    }
                    // Hall1
                    if (this.hall1 === true) {

                        this.freeHallList1.sort(numberAs2);

                        let numa = this.freeHallList1[0];
                        if ( numa !== 1) {
                            this.freeHall1.push({start: 1 , end: numa});
                        }
                        for (const list of this.freeHallList1) {
                            const num1 = list - numa;
                            if (num1 !== 0 && num1 !== 1 ) {
                                const starts = numa;
                                const ends = list;
                                this.freeHall1.push({start: starts , end: ends});
                            }
                            numa = list;
                        }
                        const lasta = this.freeHallList1[this.freeHallList1.length - 1];
                        if ( lasta !== 19) {
                            this.freeHall1.push({start: lasta , end: 19});
                        }
                    } else {
                        this.freeHall1.push({start: 1 , end: 19});
                    }
                    // Hall2
                    if (this.hall2 === true) {

                        this.freeHallList2.sort(numberAs2);


                        let numb = this.freeHallList2[0];
                        if ( numb !== 1) {
                            this.freeHall2.push({start: 1 , end: numb});
                        }
                        for (const list of this.freeHallList2) {
                            const num1 = list - numb;
                            if (num1 !== 0 && num1 !== 1 ) {
                                const starts = numb;
                                const ends = list;
                                this.freeHall2.push({start: starts , end: ends});
                            }
                            numb = list;
                        }
                        const lastb = this.freeHallList2[this.freeHallList2.length - 1];
                        if ( lastb !== 19) {
                            this.freeHall2.push({start: lastb , end: 19});
                        }
                    } else {
                        this.freeHall2.push({start: 1 , end: 19});
                    }
                    // Hall3
                    if (this.hall3 === true) {

                        this.freeHallList3.sort(numberAs2);
                        let numc = this.freeHallList3[0];
                        if ( numc !== 1) {
                            this.freeHall3.push({start: 1 , end: numc});
                        }
                        for (const list of this.freeHallList3) {
                            const num1 = list - numc;
                            if (num1 !== 0 && num1 !== 1 ) {
                                const starts = numc;
                                const ends = list;
                                this.freeHall3.push({start: starts , end: ends});
                            }
                            numc = list;
                        }
                        const lastc = this.freeHallList3[this.freeHallList3.length - 1];
                        if ( lastc !== 19) {
                            this.freeHall3.push({start: lastc , end: 19});
                        }
                    } else {
                        this.freeHall3.push({start: 1 , end: 19});
                    }
                    // Hall4
                    if (this.hall4 === true) {

                        this.freeHallList4.sort(numberAs2);

                        let numd = this.freeHallList4[0];
                        if ( numd !== 1) {
                            this.freeHall4.push({start: 1 , end: numd});
                        }
                        for (const list of this.freeHallList4) {
                            const num1 = list - numd;
                            if (num1 !== 0 && num1 !== 1 ) {
                                const starts = numd;
                                const ends = list;
                                this.freeHall4.push({start: starts , end: ends});
                            }
                            numd = list;
                        }
                        const lastd = this.freeHallList4[this.freeHallList4.length - 1];
                        if ( lastd !== 19) {
                            this.freeHall4.push({start: lastd , end: 19});
                        }
                    } else {
                        this.freeHall4.push({start: 1 , end: 19});
                    }
                    // Hall5
                    if (this.hall5 === true) {

                        this.freeHallList5.sort(numberAs2);


                        let nume = this.freeHallList5[0];
                        if ( nume !== 1) {
                            this.freeHall5.push({start: 1 , end: nume});
                        }
                        for (const list of this.freeHallList5) {
                            const num1 = list - nume;
                            if (num1 !== 0 && num1 !== 1 ) {
                                const starts = nume;
                                const ends = list;
                                this.freeHall5.push({start: starts , end: ends});
                            }
                            nume = list;
                        }
                        const laste = this.freeHallList5[this.freeHallList5.length - 1];
                        if ( laste !== 19) {
                            this.freeHall5.push({start: laste , end: 19});
                        }
                    } else {
                        this.freeHall5.push({start: 1 , end: 19});
                    }
                    // Hall6
                    if (this.hall6 === true) {

                        this.freeHallList6.sort(numberAs2);
                        let numf = this.freeHallList6[0];
                        if ( numf !== 1) {
                            this.freeHall6.push({start: 1 , end: numf});
                        }
                        for (const list of this.freeHallList6) {
                            const num1 = list - numf;
                            if (num1 !== 0 && num1 !== 1 ) {
                                const starts = numf;
                                const ends = list;
                                this.freeHall6.push({start: starts , end: ends});
                            }
                            numf = list;
                        }
                        const lastf = this.freeHallList6[this.freeHallList6.length - 1];
                        if ( lastf !== 19) {
                            this.freeHall6.push({start: lastf , end: 19});
                        }
                    } else {
                        this.freeHall6.push({start: 1 , end: 19});
                    }
                    // LT-104
                    // LT-105
                    // LT-202
                    // Z-9
                    // NLH
                    // CIS Lab
                    function numberAs2(a, b) {
                        return a - b;
                    }
                },
                (error) => console.log(error)
            )

    }

    selectTime(timeStart: string, timeEnd: string) {
        this.buttonFree = true;
        this.timeNumber = [];
        this.freeLectureHallList = [{name: 'hall' , id: 1 }];
        let start2 = 0;
        let end2 = 0;
        for (const check of this.checkList) {
            if ( timeStart === check.time) {
                start2 = check.id;
            }
            if ( timeEnd === check.time ) {
                end2 = check.id;
            }
        }
        const gap = end2 - start2;
        this.timeNumber.push(start2);
        let start21 = 0;
        for (let i = 1; i <= gap; i++) {
             start21 = start2 + 1;
            this.timeNumber.push(start21);
            start2 = start21;
        }
        for ( const check of this.checkList) {
            for ( const num of this.timeNumber) {
                if ( num === check.id ) {
                    this.timeList.push({time: check.time , id: check.id});
                }
            }
        }
        console.log('timeList');
        console.log(this.timeList);
        // LT-104
        for ( const hallFree of this.freeHall1) {
            if ( hallFree.start <= start2 && hallFree.end >= end2) {
                this.freeLectureHallList.push({name: 'LT-104' , id: 1});
                break;
            }
        }
        // LT-105
        for ( const hallFree of this.freeHall2) {
            if ( hallFree.start <= start2 && hallFree.end >= end2) {
                this.freeLectureHallList.push({name: 'LT-105' , id: 2});
                break;
            }
        }
        // LT-202
        for ( const hallFree of this.freeHall3) {
            if ( hallFree.start <= start2 && hallFree.end >= end2) {
                this.freeLectureHallList.push({name: 'LT-202' , id: 3});
                break;
            }
        }
        // z-9
        for ( const hallFree of this.freeHall4) {
            if ( hallFree.start <= start2 && hallFree.end >= end2) {
                this.freeLectureHallList.push({name: 'Z-9' , id: 4});
                break;
            }
        }
        // NLH
        for ( const hallFree of this.freeHall5) {
            if ( hallFree.start <= start2 && hallFree.end >= end2) {
                this.freeLectureHallList.push({name: 'NLH' , id: 5});
                break;
            }
        }
        // CIS Lab
        for ( const hallFree of this.freeHall6) {
            if ( hallFree.start <= start2 && hallFree.end >= end2) {
                this.freeLectureHallList.push({name: 'CIS Lab' , id: 6});
                break;
            }
        }
    }
    selectHall( hallsId: number) {
        this.buttonHall = true;
        this.lectureHallService.getHall(hallsId)
            .subscribe(
                (hall: LectureHall) => {
                    this.addHall = hall;
                },
                (error) => console.log(error)
            );
    }
    selectStartTime (startId: number) {
        this.buttonStart = true;
        this.timeService.getTime(startId)
            .subscribe(
                (start: Time) => {
                    this.addStartTime = start;
                },
                (error) => console.log(error)
            );
    }
    selectEndTime (endId: number) {
        this.buttonEnd = true;
        this.timeService.getTime(endId)
            .subscribe(
                (end: Time) => {
                    this.addEndTime = end;
                },
                (error) => console.log(error)
            );
        if (this.buttonEnd === true &&
        this.buttonStart === true &&
        this.buttonHall === true &&
        this.buttonFree === true &&
        this.buttonDay === true) {
            this.buttonActive = true;
        }
    }
    addLecture() {
        this.addActive = true;
        this.addTWeek = true;
        this.addNWeek = false;
        this.addState = 'new';
        this.timeTableObject.active = this.addActive;
        this.timeTableObject.tWeek = this.addTWeek;
        this.timeTableObject.nWeek = this.addNWeek;
        this.timeTableObject.state = this.addState;
        this.timeTableObject.lecture = this.adLecture;
        this.timeTableObject.semester = this.addSemester;
        this.timeTableObject.date = this.addDate;
        this.timeTableObject.course = this.addCourse;
        this.timeTableObject.startTime = this.addStartTime;
        this.timeTableObject.endTime = this.addEndTime;
        this.timeTableObject.lectureHall = this.addHall;
        this.timeTableService.postNewTimeTable(this.timeTableObject)
            .subscribe(
                (response) => {
                    console.log(response);
                },
                (error) => console.log(error)
            );
        this.newMessage.message = 'New Lecture added for ' + this.addSemester.semesterName + ' regarding ' +
            this.addCourse.courseName + ' on ' + this.addDate.day + ' at ' + this.addStartTime.time +
            ' to ' + this.addEndTime.time + ' in ' + this.addHall.name + '.' ;
        this.newMessage.type = 'send';
        this.newMessage.lecture = this.adLecture;
        this.sendMessageService.saveMessage(this.newMessage)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (error) => console.log(error)
            );
        this.messagingService.sendNotificationMessages(this.adLecture , this.addSemester,
            this.addDate , this.addStartTime, this.addEndTime,
            this.addHall , this.addCourse)
            .subscribe(
                (res) => {
                    console.log(res);
                    console.log('button works 222');
                },
                        (error) => console.log(error)
            );
        /*this.messagingService.sendTwilioMessages(this.adLecture , this.addSemester,
            this.addDate , this.addStartTime, this.addEndTime,
            this.addHall , this.addCourse)
            .subscribe(
                (res) => {
                    console.log(res);
                    console.log('button works 222');
                },
                (error) => console.log(error)
            );*/
    }
    selectWeek (weekNo: number) {
        if (weekNo === 1) {
            // This Week
            this.loadScripts();
            this.buttonThisWeek = true;
            this.buttonNextWeek = false;
            this.freeMondayTest = [];
            this.freeMonday = [];
            this.freeMondayList = [];
            this.freeTuesdayTest = [];
            this.freeTuesday = [];
            this.freeTuesdayList = [];
            this.freeWednesdayTest = [];
            this.freeWednesday = [];
            this.freeWednesdayList = [];
            this.freeThursdayTest = [];
            this.freeThursday = [];
            this.freeThursdayList = [];
            this.freeFridayTest = [];
            this.freeFriday = [];
            this.freeFridayList = [];
            this.selectTimeTableList(1);
        } else {
            this.loadScripts();
            this.buttonThisWeek = false;
            this.buttonNextWeek = true;
            this.freeMondayTest = [];
            this.freeMonday = [];
            this.freeMondayList = [];
            this.freeTuesday = [];
            this.freeTuesdayList = [];
            this.freeWednesdayTest = [];
            this.freeWednesday = [];
            this.freeWednesdayList = [];
            this.freeThursdayTest = [];
            this.freeThursday = [];
            this.freeThursdayList = [];
            this.freeFridayTest = [];
            this.freeFriday = [];
            this.freeFridayList = [];
            this.selectTimeTableList(2);
        }
    }

}
