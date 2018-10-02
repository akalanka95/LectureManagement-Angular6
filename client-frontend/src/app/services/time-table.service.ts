import { Injectable } from '@angular/core';
import {Course} from '../models/Course.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TimeTable} from '../models/TimeTable.model';
import {Student} from '../models/Student.model';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {

    constructor(private http: HttpClient) { }
    getListOfTimeTables() {
        const url = '/api/frontend/timeTables/findAll';
        return this.http.get
        (url);
    }
    postNewTimeTable(newTimeTable: TimeTable) {
        const url = '/api/frontend/timeTables/addTimeTable';
        return this.http.post
        (url, newTimeTable);

    }
    getListOfTimeTablesBySemester(semesterId: number) {
        const url = 'http://localhost:8080/frontend/timeTables/findBySemester/' + 1;
        return this.http.get
        (url);
    }
    updateEnableByMonday(active: boolean) {
        console.log('works timetable update date222');
        const url = '/api/frontend/timeTables/updateEnableByMonday/' + active;
        return this.http.get
        (url);
    }
    getListOfTimeTableBySemesterAndLecture(semId: number , lecId: number) {
        const url = '/api/frontend/timeTables/listOfTimeTableBySemesterAndLecture/' + semId + '/' + lecId;
        return this.http.get
        (url);
    }
    getListOfTimeTableBySemesterORLecture(semId: number , lecId: number) {
        const url = '/api/frontend/timeTables/listOfTimeTableBySemesterORLecture/' + semId + '/' + lecId;
        return this.http.get
        (url);
    }

    getListOfTimeTableByDay(day: number) {
        const url = '/api/frontend/timeTables/listOfTimeTableByDay/' + day;
        return this.http.get
        (url);
    }
    getListOfTimeTablesWeek() {
        const url = '/api/frontend/timeTables/listOfTimeTableByWeek';
        return this.http.get
        (url);
    }
    delete(timeTable: TimeTable) {
        const url = '/api/frontend/timeTables/delete';
        return this.http.put
        (url,  timeTable);
    }
    updateTimeTable(updateSubject: TimeTable) {
        const url = '/api/frontend/timeTables/updateSubject';
        return this.http.put
        (url, updateSubject );

    }
    getListOfTimeTablesByLectureId(lecId: number) {
        const url = '/api/frontend/timeTables/listOfTimeTableByLectureId/' + lecId;
        return this.http.get
        (url);
    }
    saveTimeTableweek(newTimeTable: TimeTable[]) {
        const url = '/api/frontend/timeTablesWeek/save';
        return this.http.post
        (url, newTimeTable);

    }
    getListOfTimeTableWeekBySemIdAndCourseId (semId: number , couId: number) {
        const url = 'http://localhost:8080/frontend/timeTablesWeek/semIdAndcouId/' + semId + '/' + couId ;
        return this.http.get
        (url);
    }
    getListOfTimeTableWeekBySemIdAndWeekId (semId: number , weekId: number) {
        const url = 'http://localhost:8080/frontend/timeTablesWeek/semIdAndweekId/' + semId + '/' + weekId ;
        return this.http.get
        (url);
    }
    getListOfTimeTableWeekBySemIdAndAllWeeks (semId: number) {
        const url = 'http://localhost:8080/frontend/timeTablesWeek/semIdAndAllWeekId/' + semId  ;
        return this.http.get
        (url);
    }
}
