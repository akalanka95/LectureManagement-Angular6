import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

    constructor(private http: HttpClient) { }
    getListOfDepartments() {
        const url = '/api/departments/findAll';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
}
