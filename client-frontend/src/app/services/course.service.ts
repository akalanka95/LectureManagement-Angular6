import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course} from '../models/Course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }
    getListOfCourses() {
        const url = '/api/courses/findAll';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    postNewCourse(newCourse: Course) {
        const url = '/api/courses/addCourse';
        return this.http.post
        (url, newCourse, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
    getListOfCoursesBySemester (semId: number) {
        const url = 'http://localhost:8080/frontend/courses/findBySemesterId/' + semId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    getCourse(couId: number) {
        const url = '/api/courses/findById/' + couId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
}
