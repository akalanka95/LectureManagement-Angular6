import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {ViewProfileComponent} from '../../view-profile/view-profile.component';
import {LecturesDetailComponent} from '../../view-profile/lecturer/lectures-detail/lectures-detail.component';
import {StudentDetailComponent} from '../../view-profile/student/student-detail/student-detail.component';
import {AddStudentComponent} from '../../view-profile/student/add-student/add-student.component';
import {TimeTableComponent} from '../../time-table/time-table.component';
import {CalanderComponent} from '../../calander/calander.component';
import {ScheduleComponent} from '../../schedule/schedule.component';
import {AttendanceComponent} from '../../attendance/attendance.component';
import {AddLectureComponent} from '../../view-profile/lecturer/add-lecture/add-lecture.component';
import {DepartmentTimeTableComponent} from '../../time-table/department-time-table/department-time-table.component';
import {NoticeBoardComponent} from '../../notice-board/notice-board.component';
import {CheckingComponent} from '../../checking/checking.component';
import {AddSubjectComponent} from '../../checking/add-subject/add-subject.component';
import {SearchComponent} from '../../checking/search/search.component';
import {CancelingComponent} from '../../checking/canceling/canceling.component';
import {SemesterCancelComponent} from '../../checking/semester-cancel/semester-cancel.component';
import {ChatComponent} from '../../chat/chat.component';
import {ReportComponent} from '../../report/report.component';
import {ResetComponent} from '../../reset/reset.component';
import {TablesearchComponent} from '../../time-table/tablesearch/tablesearch.component';
import {LectureHallComponent} from '../../time-table/lecture-hall/lecture-hall.component';
import {MailComponent} from '../../mail/mail.component';
import {ComposeComponent} from '../../mail/compose/compose.component';
import {LectureTimeComponent} from '../../time-table/lecture-time/lecture-time.component';
import {MailSendComponent} from '../../mail/mail-send/mail-send.component';
import {MessageComponent} from '../../message/message.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'view-profile',   component: ViewProfileComponent , children : [
            {path : 'lectures', component : LecturesDetailComponent},
            {path : 'lectures/edit', component : AddLectureComponent},
            {path : 'add/lecture', component : AddLectureComponent},
            {path : 'students', component : StudentDetailComponent},
            {path : 'add/student', component : AddStudentComponent},
            {path : 'students/edit', component : AddStudentComponent}]},
    { path: 'schedule',   component: ScheduleComponent },
    { path: 'event',   component: CalanderComponent },
    { path: 'timeTable',   component: TimeTableComponent, children : [
            {path : 'view/semester', component : TablesearchComponent},
            {path : 'view/lectureHall', component : LectureHallComponent},
            {path : 'view/lecture', component : LectureTimeComponent},
            {path : 'view/semester/week/:id', component : DepartmentTimeTableComponent}
            ]},
    { path: 'attendance',   component: AttendanceComponent },
    { path: 'search',   component: CheckingComponent, children : [
            {path : 'form/view/freeTime/:semId/:lecId/:couId', component : AddSubjectComponent},
            {path : 'form', component : SearchComponent},
            { path: 'cancel',   component: CancelingComponent },
            { path: 'cancel/semester/:id',   component: SemesterCancelComponent},
        ]},
    { path: 'chat',   component: MailComponent , children : [
            {path : 'mail', component : MailSendComponent , children : [
                    {path : 'compose', component : ComposeComponent}
                ]},
            {path : 'message', component : MessageComponent}
    ]},
    { path: 'notice-board',   component: NoticeBoardComponent },
    { path: 'report',   component: ReportComponent },
    { path: 'reset',   component: ResetComponent},
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
