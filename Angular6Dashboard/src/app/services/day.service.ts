import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Lecture} from '../models/Lecture.model';
import {Day} from '../models/Day.model';

@Injectable({
  providedIn: 'root'
})
export class DayService {

    constructor(private http: HttpClient) { }
    getListOfDays() {
        const url = '/api/days/findAll';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    updateDayList(updateDayList: Day[]) {
        const url = '/api/days/updateAll';
        return this.http.put
        (url, updateDayList , { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
}
