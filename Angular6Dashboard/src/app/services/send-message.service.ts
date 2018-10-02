import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from '../models/Message.model';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {
    constructor(private http: HttpClient) { }
    getListOfMessage() {
        const url = '/api/messages/findAll';
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    getListOfMessageByLectureId(lecId: number) {
        const url = '/api/messages/findByLectureId/' + lecId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    saveMessage(message: Message) {
        const url = '/api/messages/save';
        return this.http.post
        (url,  message,{ headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
}
