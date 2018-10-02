import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from '../models/Student.model';
import {Week} from '../models/Week.model';

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor(private http: HttpClient) { }
    findWeek() {
        const url = '/api/weeks/findWeek';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    saveWeek(week: Week[]) {
        const url = '/api/weeks/saveWeek';
        return this.http.post
        (url, week , { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }

}
