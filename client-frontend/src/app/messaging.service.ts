import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {TokenService} from './token.service';
import {Token} from './models/Token.model';

@Injectable()
export class MessagingService {

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  newToken = new Token();

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              private tokenService: TokenService) { }


  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) { return; }

      const data = { [user.uid]: token };
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        // save token in the database
        console.log(token);
        this.newToken.token = token;
        this.tokenService.saveToken(this.newToken)
          .subscribe(
            (res) => {
              console.log(res);
              console.log('successssssssssssssssss');
            },
            (error) => {
              console.log(error);
              console.log('errorrrrrrrrrrrr');
            }
          );
        console.log('Move to Token service update work in frontend');
        this.updateToken(token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });

  }
}
