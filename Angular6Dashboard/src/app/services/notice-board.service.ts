import { Injectable } from '@angular/core';
import {Student} from '../models/Student.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NoticeBoard} from '../models/NoticeBoard.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeBoardService {

  constructor(private http: HttpClient) { }
    save(notice: NoticeBoard) {
        const url = '/api/notices/save';
        return this.http.post
        (url, notice, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
}
