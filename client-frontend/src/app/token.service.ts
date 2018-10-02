import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Token} from './models/Token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private http: HttpClient) { }
  saveToken(token: Token) {
    const url = 'https://0f9d9684.ngrok.io/token/save';
    console.log('token point');
    return this.http.post
    (url , token);
  }
}
