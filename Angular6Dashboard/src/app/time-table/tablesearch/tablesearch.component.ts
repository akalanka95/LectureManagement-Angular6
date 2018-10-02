import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tablesearch',
  templateUrl: './tablesearch.component.html',
  styleUrls: ['./tablesearch.component.scss']
})
export class TablesearchComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }
    selectSemester (semId: number) {
        return this.router.navigate(['week' , semId], {relativeTo: this.route});
    }

}
