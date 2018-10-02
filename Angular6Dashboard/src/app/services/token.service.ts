import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from '../models/Token.model';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private http: HttpClient) { }
  saveToken(token: Token) {
    const url = '/api/token/save';
    console.log('token point');
    return this.http.post
    (url , token ,  { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
    });
  }
  getListofTokens() {
      const url = '/api/token/findAll';
      console.log('token point');
      return this.http.get
      (url  ,  { headers: new HttpHeaders({'x-auth-token' : localStorage.getItem('xAuthToken').valueOf().substring(10, 46) })
      });
  }
}
