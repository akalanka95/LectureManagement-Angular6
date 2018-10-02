import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    mail;
    name;
    address = 'hari@codetok.com';
    subject;
    content;

    constructor() {
    }

    ngOnInit() {
    }

    send() {
        this.mail = {
            from: {
                name: this.name,
                mail: this.address
            },
            subject: this.subject,
            content: this.content
        };

        console.log(this.mail, this.name, this.subject);
    }
}
