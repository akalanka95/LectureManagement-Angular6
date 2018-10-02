import {Component, OnInit, ViewChild} from '@angular/core';
import * as Chartist from 'chartist';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DayService} from '../services/day.service';
import {Day} from '../models/Day.model';
import {AttendanceService} from '../services/attendance.service';
import {TimeTableService} from '../services/time-table.service';
import {WeekService} from '../services/week.service';
import {Week} from '../models/Week.model';
import {Options} from 'fullcalendar';
import {CalendarComponent} from 'ng-fullcalendar';
import {EventService} from '../event.service';
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    calendarOptions: Options;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    displayEvent: any;
    events = null;
    dayList: Day[] = [];
    activeDay: Array<string> = [];
    message;
    curDate = new Date();
    weekList: Week[];
    weekNo: string;
    constructor(private dayService: DayService,
                private attendanceService: AttendanceService,
                private timeTableservice: TimeTableService,
                private weekservice: WeekService,
                private route: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                protected eventService: EventService) {
    }
    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };

    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    ngOnInit() {
        this.calendarOptions = {
            editable: true,
            eventLimit: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            events: []
        };
        // week
        this.weekservice.findWeek()
            .subscribe(
                (weekList: Week[]) => {
                    this.weekList = weekList;
                    for ( const weekActive of this.weekList) {
                        if (weekActive.active === true) {
                            this.weekNo = weekActive.week;
                        }
                    }
                },
                (error) => console.log(error)
            );
        // my edit
        this.dayService.getListOfDays()
            .subscribe(
                (dayList: any[]) => {
                    this.dayList = dayList;
                },
                (error) => console.log(error)
            );
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
        const dataDailySalesChart: any = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };

        const optionsDailySalesChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        this.startAnimationForLineChart(dailySalesChart);


        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        const dataCompletedTasksChart: any = {
            labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
            series: [
                [230, 750, 450, 300, 280, 240, 200, 190]
            ]
        };

        const optionsCompletedTasksChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);


        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var datawebsiteViewsChart = {
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

            ]
        };
        var optionswebsiteViewsChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
        };
        var responsiveOptions: any[] = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
    }

    saveDay() {
        this.activeDay = [];
        for (const day of this.dayList) {
            if (day.day === 'Monday') {
                this.attendanceService.updateMonday(day.active).subscribe(
                    (response) => {
                        console.log('Monday updated succesfully');
                        console.log(response);
                    },
                    (error) => console.log(error)
                );
                this.timeTableservice.updateEnableByMonday(day.active).subscribe(
                    (response) => {
                        console.log('works timetable update date');
                        console.log(response);
                    },
                    (error) => console.log(error)
                );
            }
            /*this.activeDay.push(day.day);*/
        }
        console.log('this is active day');
        console.log(this.activeDay);

        this.dayService.updateDayList(this.dayList)
            .subscribe(
                (response) => {
                    console.log(response)
                },
                (error) => console.log(error)
            );
  }
    loadevents() {
        this.eventService.getEvents().subscribe(data => {
            this.events = data;
        });
    }
    clickButton(model: any) {
        this.displayEvent = model;
    }
    dayClick(model: any) {
        console.log(model);
    }
    eventClick(model: any) {
        model = {
            event: {
                id: model.event.id,
                start: model.event.start,
                end: model.event.end,
                title: model.event.title,
                allDay: model.event.allDay
                // other params
            },
            duration: {}
        }
        this.displayEvent = model;
    }
    updateEvent(model: any) {
        model = {
            event: {
                id: model.event.id,
                start: model.event.start,
                end: model.event.end,
                title: model.event.title
                // other params
            },
            duration: {
                _data: model.duration._data
            }
        }
        this.displayEvent = model;
    }

}
