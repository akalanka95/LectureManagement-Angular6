import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LectureHallService {

    constructor(private http: HttpClient) { }
    getListOfHalls() {
        const url = '/api/halls/findAll';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' :
                    localStorage.getItem('xAuthToken')
                        .valueOf().substring(10, 46) })
        });
    }
    getHall(hallId: number) {
        const url = '/api/halls/findById/' + hallId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
}
