import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  active = true;
  constructor(private router: Router,
              private route: ActivatedRoute) {this.loadScripts(); }
  loadScripts() {
    const dynamicScripts = [
      'https://platform.twitter.com/widgets.js',
      'assets/js/jquery-3.0.0.min.js',
      'assets/js/main.js',
      'assets/js/modernizr.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }

  }
  ngOnInit() {
  }
  selectSemester (semId: number) {
    this.active = false;
    return this.router.navigate(['week' , semId], {relativeTo: this.route});
  }

}
