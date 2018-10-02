import { Component, OnInit } from '@angular/core';
import {Lecture} from '../models/Lecture.model';
import {TimeService} from '../services/time.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SendMessageService} from '../services/send-message.service';
import {Message} from '../models/Message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  typeText: string;
  messageList: Message[] = [];
  messageListLast: Message[] = [];
  lectureMessageList: Message[] = [];
  lectureMessageListRecieved: Message[] = [];
  lectureMessageListSend: Message[] = [];
  newMessage = new Message();
  selectLectureNew: Lecture;
  lecturesId: Array<number> = [];
  lecturesIdOnce: Array<number> = [];
  number: Array<number> = [];
    constructor(private sendMessageService: SendMessageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.getMessageList();
  }
  getMessageList() {
        this.lecturesId = [];
        this.lecturesIdOnce = [];
        this.number = [];
        this.messageListLast = [];
      this.sendMessageService.getListOfMessage()
          .subscribe(
              (messageList: Message[]) => {
                  this.messageList = messageList;
                  for (const list of this.messageList) {
                      this.lecturesId.push(list.lecture.id);
                  }

                  for ( const list of this.lecturesId) {
                      const start = list;
                      if (!this.lecturesIdOnce.includes(start)) {
                          this.lecturesIdOnce.push(start);
                      }
                  }
                  let value = 0;
                  for (const list of this.lecturesIdOnce) {
                      value = 0;
                      for ( const check of this.messageList) {
                          if (check.lecture.id === list) {
                              value = check.id;
                          }
                      }
                      this.number.push(value);
                  }
                  for ( const list of this.number) {
                      for ( const check of this.messageList) {
                          if ( list === check.id) {
                              this.messageListLast.push(check);
                          }
                      }
                  }
              },
              (error) => console.log(error)
          );
  }
  sendMessage() {
   this.newMessage.message = this.typeText;
   this.newMessage.type = 'send';
   this.newMessage.lecture = this.selectLectureNew;
      this.sendMessageService.saveMessage(this.newMessage)
          .subscribe(
              (res) => {
                  this.selectLecture(this.selectLectureNew);
                  this.getMessageList();
              },
              (error) => console.log(error)
          );
  }
    selectLecture (lecture: Lecture) {
    this.selectLectureNew = lecture;
        this.sendMessageService.getListOfMessageByLectureId(lecture.id)
            .subscribe(
                (lectureMessageList: Message[]) => {
                    this.lectureMessageList = lectureMessageList;
                    for ( const list of this.lectureMessageList) {
                      if (list.type === 'send') {
                        this.lectureMessageListSend.push(list);
                      } else {
                          this.lectureMessageListRecieved.push(list);
                      }
                    }
                },
                (error) => console.log(error)
            );
    }

}
