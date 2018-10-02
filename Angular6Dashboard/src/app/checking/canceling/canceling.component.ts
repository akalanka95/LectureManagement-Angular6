import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-canceling',
  templateUrl: './canceling.component.html',
  styleUrls: ['./canceling.component.scss']
})
export class CancelingComponent implements OnInit {

  constructor( private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
  }
  selectSemester (semId: number) {
      return this.router.navigate(['semester' , semId], {relativeTo: this.route});
  }

}
