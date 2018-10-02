import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

    constructor(private http: HttpClient) { }
    getListOfSemesters() {
        const url = 'http://localhost:8080/frontend/semesters/findAll';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    getSemester(semId: number) {
        const url = '/api/semesters/findById/' + semId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
}
