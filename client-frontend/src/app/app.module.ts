import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {PushNotificationsService} from './push.notification.service';
import { TimeTableComponent } from './time-table/time-table.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {MessagingService} from './messaging.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {TokenService} from './token.service';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { ReportComponent } from './report/report.component';
import { DepartmentComponent } from './time-table/department/department.component';
import {TimeTableService} from './services/time-table.service';
import {WeekService} from './services/week.service';
import {CourseService} from './services/course.service';
import {SemesterService} from './services/semester.service';
import {MaterialModule} from './material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatSelectModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TimeTableComponent,
    NoticeBoardComponent,
    ReportComponent,
    DepartmentComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [PushNotificationsService , MessagingService , TokenService,
  TimeTableService, WeekService, CourseService, SemesterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
