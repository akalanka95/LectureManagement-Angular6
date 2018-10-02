import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import {ViewProfileComponent} from '../../view-profile/view-profile.component';
import {StudentDetailComponent} from '../../view-profile/student/student-detail/student-detail.component';
import {LecturesDetailComponent} from '../../view-profile/lecturer/lectures-detail/lectures-detail.component';
import {AddStudentComponent} from '../../view-profile/student/add-student/add-student.component';
import {TimeTableComponent} from '../../time-table/time-table.component';
import {CalanderComponent} from '../../calander/calander.component';
import {FlatpickrModule } from 'angularx-flatpickr';
import {CalendarModule} from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ScheduleComponent} from '../../schedule/schedule.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {MaterialModule} from '../../material';
import {AttendanceComponent} from '../../attendance/attendance.component';
import {AddLectureComponent} from '../../view-profile/lecturer/add-lecture/add-lecture.component';
import {DepartmentService} from '../../services/department.service';
import {DepartmentTimeTableComponent} from '../../time-table/department-time-table/department-time-table.component';
import {NoticeBoardComponent} from '../../notice-board/notice-board.component';
import {CheckingComponent} from '../../checking/checking.component';
import {AddSubjectComponent} from '../../checking/add-subject/add-subject.component';
import {SearchComponent} from '../../checking/search/search.component';
import {promise} from 'selenium-webdriver';
import CancellationError = promise.CancellationError;
import {CancelingComponent} from '../../checking/canceling/canceling.component';
import {SemesterCancelComponent} from '../../checking/semester-cancel/semester-cancel.component';
import {ChatComponent} from '../../chat/chat.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {QuillModule} from 'ngx-quill';
import {ReportComponent} from '../../report/report.component';
import {ResetComponent} from '../../reset/reset.component';
import {TablesearchComponent} from '../../time-table/tablesearch/tablesearch.component';
import {LectureHallComponent} from '../../time-table/lecture-hall/lecture-hall.component';
import {MailComponent} from '../../mail/mail.component';
import {ComposeComponent} from '../../mail/compose/compose.component';
import {LectureTimeComponent} from '../../time-table/lecture-time/lecture-time.component';
import {MessageComponent} from '../../message/message.component';
import {MailSendComponent} from '../../mail/mail-send/mail-send.component';
import {FullCalendarModule} from 'ng-fullcalendar';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
      ReactiveFormsModule,
      MaterialModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
      FlexLayoutModule,
      FullCalendarModule,
      QuillModule,
      MDBBootstrapModule.forRoot(),
      FlatpickrModule.forRoot(),
      CalendarModule.forRoot(),
      NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
      ViewProfileComponent,
      LecturesDetailComponent,
      StudentDetailComponent,
      AddStudentComponent,
      TimeTableComponent,
      CalanderComponent,
      ScheduleComponent,
      AttendanceComponent,
      AddLectureComponent,
      DepartmentTimeTableComponent,
      NoticeBoardComponent,
      CheckingComponent,
      AddSubjectComponent,
      SearchComponent,
      CancelingComponent,
      SemesterCancelComponent,
      ChatComponent,
      ReportComponent,
      ResetComponent,
      TablesearchComponent,
      LectureHallComponent,
      MailComponent,
      ComposeComponent,
      LectureTimeComponent,
      MessageComponent,
      MailSendComponent
  ],
    exports: [CalanderComponent , ScheduleComponent  ]
})

export class AdminLayoutModule {}
