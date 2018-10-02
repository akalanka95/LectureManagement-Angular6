import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../../../services/student.service';
import {LectureService} from '../../../services/lecture.service';
import {Lecture} from '../../../models/Lecture.model';
import {Student} from '../../../models/Student.model';

@Component({
  selector: 'app-lectures-detail',
  templateUrl: './lectures-detail.component.html',
  styleUrls: ['./lectures-detail.component.scss']
})
export class LecturesDetailComponent implements OnInit, OnDestroy {

  lecturesList: Lecture[] = [];
  passLecture: Lecture;
  constructor(private lectureService: LectureService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.lectureService.getListOfLectures()
          .subscribe(
              (lectures: Lecture[]) => {
                  /*this.lecturesList = lectures;*/
                  for (const list of lectures) {
                      if (list.active === true) {
                          this.lecturesList.push(list);
                      }
                  }
              },
              (error) => console.log(error)
          )
  }
    onEditLecture(lecture: Lecture) {
        this.passLecture = lecture;
        return this.router.navigate(['edit'], {relativeTo: this.route});
        /*this.lectureService.newEmitter.emit(lecture);*/
    }
    onDeleteLecture(lecture: Lecture) {
        this.lecturesList = [];
        lecture.active = false;
        this.lectureService.updateLecture(lecture)
            .subscribe(
                (res) => {
                    this.lectureService.getListOfLectures()
                        .subscribe(
                            (lectures: Lecture[]) => {
                                for (const list of lectures) {
                                    if (list.active === true) {
                                        this.lecturesList.push(list);
                                    }
                                }
                            },
                            (error) => console.log(error)
                        )
                },
                (error) => console.log(error)
            )
    }

    ngOnDestroy(): void {
        this.lectureService.passingLecture = this.passLecture;
    }
}
