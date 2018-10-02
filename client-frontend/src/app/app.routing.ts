import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {TimeTableComponent} from './time-table/time-table.component';
import {NoticeBoardComponent} from './notice-board/notice-board.component';
import {ReportComponent} from './report/report.component';
import {DepartmentComponent} from './time-table/department/department.component';


const routes: Routes = [
  {
    path: 'timeTable',
    component: TimeTableComponent , children : [
      {path : 'week/:semId', component : DepartmentComponent}
]
  },
  {
    path: 'timeTable/wee/:semId',
    component: DepartmentComponent
  },
  {
    path: 'notice',
    component: NoticeBoardComponent
  },
  {
    path: 'report',
    component: ReportComponent
  }
    ];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
