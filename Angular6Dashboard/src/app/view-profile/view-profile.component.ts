import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

    active = 'Add Student';
    activeId = 'student';
    constructor() {
    }

    ngOnInit() {

    }
    activeTab(text: string, textId: string) {
        this.active = text;
        this.activeId = textId;
    }

}
