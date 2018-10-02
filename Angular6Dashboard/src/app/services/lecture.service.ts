import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from '../models/Student.model';
import {Lecture} from '../models/Lecture.model';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
    passingLecture: Lecture;
    constructor(private http: HttpClient) { }
    getListOfLectures() {
        const url = '/api/lectures/findAll';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    updateLectureList(updateLectureList: Lecture[]) {
        const url = '/api/lectures/updateAll';
        return this.http.put
        (url, updateLectureList , { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
    updateLecture(updateLectureList: Lecture) {
        const url = '/api/lectures/update';
        return this.http.put
        (url, updateLectureList , { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }

    postNewLecture(newLecture: Lecture) {
        const url = '/api/lectures/addLecture';
        return this.http.post
        (url, newLecture, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
    getLecture(lecId: number) {
        const url = '/api/lectures/findById/' + lecId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    deleteLecture(lecture: Lecture) {
        const url = '/api/lectures/deleteLecture';
        return this.http.put
        (url, lecture , { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
}
