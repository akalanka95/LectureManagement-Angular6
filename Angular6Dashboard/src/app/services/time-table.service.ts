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
        const url = '/api/timeTables/findAll';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    postNewTimeTable(newTimeTable: TimeTable) {
        const url = '/api/timeTables/addTimeTable';
        return this.http.post
        (url, newTimeTable, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
    getListOfTimeTablesBySemester(semesterId: number) {
        const url = '/api/timeTables/findBySemester/' + semesterId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    updateEnableByMonday(active: boolean) {
        console.log('works timetable update date222');
        const url = '/api/timeTables/updateEnableByMonday/' + active;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    getListOfTimeTableBySemesterAndLecture(semId: number , lecId: number) {
        const url = '/api/timeTables/listOfTimeTableBySemesterAndLecture/' + semId + '/' + lecId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    getListOfTimeTableBySemesterORLecture(semId: number , lecId: number) {
        const url = '/api/timeTables/listOfTimeTableBySemesterORLecture/' + semId + '/' + lecId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }

    getListOfTimeTableByDay(day: number) {
        const url = '/api/timeTables/listOfTimeTableByDay/' + day;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    getListOfTimeTablesWeek() {
        const url = '/api/timeTables/listOfTimeTableByWeek';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    delete(timeTable: TimeTable) {
        const url = '/api/timeTables/delete';
        return this.http.put
        (url,  timeTable, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    updateTimeTable(updateSubject: TimeTable) {
        const url = '/api/timeTables/updateSubject';
        return this.http.put
        (url, updateSubject , { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
    getListOfTimeTablesByLectureId(lecId: number) {
        const url = '/api/timeTables/listOfTimeTableByLectureId/' + lecId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    saveTimeTableweek(newTimeTable: TimeTable[]) {
        const url = '/api/timeTablesWeek/save';
        return this.http.post
        (url, newTimeTable, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
    getListOfTimeTableWeekBySemIdAndCourseId (semId: number , couId: number) {
        const url = '/api/timeTablesWeek/semIdAndcouId/' + semId + '/' + couId ;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    getListOfTimeTableWeekBySemIdAndWeekId (semId: number , weekId: number) {
        const url = '/api/timeTablesWeek/semIdAndweekId/' + semId + '/' + weekId ;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    getListOfTimeTableWeekBySemIdAndAllWeeks (semId: number) {
        const url = '/api/timeTablesWeek/semIdAndAllWeekId/' + semId  ;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
}
