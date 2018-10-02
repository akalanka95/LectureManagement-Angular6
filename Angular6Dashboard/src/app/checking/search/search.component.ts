import { Component, OnInit } from '@angular/core';
import {SemesterService} from '../../services/semester.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Semester} from '../../models/Semester.model';
import {Course} from '../../models/Course.model';
import {CourseService} from '../../services/course.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    semesterList: Semester[] = [];
    courseList: Course[] = [];
    semesterId: number;
    lectureId: number;
    courseId: number;
    constructor(private courseService: CourseService,
                private semesterService: SemesterService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.semesterService.getListOfSemesters()
            .subscribe(
                (semesterList: any[]) => {
                    this.semesterList = semesterList;
                },
                (error) => console.log(error)
            )
    }
    selectSemester(semester: Semester) {
        this.semesterId = semester.id;
        this.courseService.getListOfCoursesBySemester(semester.id)
            .subscribe(
                (courseList: any[]) => {
                    this.courseList = courseList;
                },
                (error) => console.log(error)
            )
    }
    selectCourse (course: Course) {
        this.courseId = course.id;
        this.lectureId = course.lecture.id;
    }
    onSearch () {
        return this.router.navigate(['view/freeTime' ,  this.semesterId , this.lectureId , this.courseId ], {relativeTo: this.route});
    }

}
