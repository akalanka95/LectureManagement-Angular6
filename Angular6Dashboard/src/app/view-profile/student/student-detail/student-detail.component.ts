import {Component, OnDestroy, OnInit} from '@angular/core';
import {Student} from '../../../models/Student.model';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit, OnDestroy {

    passStudent: Student;
    students: Student[] = [] ;
    studentId: number;
    modalStudent: Student;

    constructor(private studentService: StudentService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.studentService.getListOfStudents()
            .subscribe(
                (student: any[]) => {
                    this.students = student;
                },
                (error) => console.log(error)
            )
    }
    getId(student: Student) {
      this.studentId = student.id;
        this.studentService.getStudentByID(this.studentId)
            .subscribe(
                (studentM: Student) => {
                    this.modalStudent = studentM;
                },
                (error) => console.log(error)
            )
    }
    onEditStudent(student: Student) {
        this.passStudent = student;
        return this.router.navigate(['edit'], {relativeTo: this.route});
        /*this.lectureService.newEmitter.emit(lecture);*/
    }
    onDeleteStudent(student: Student) {
        this.studentService.deleteStudent(student)
            .subscribe(
                (students: Student) => {
                    this.studentService.getListOfStudents()
                        .subscribe(
                            (studentList: any[]) => {
                                this.students = studentList;
                            },
                            (error) => console.log(error)
                        )
                },
                (error) => console.log(error)
            )
    }

    ngOnDestroy(): void {
        this.studentService.passingStudent = this.passStudent;
    }
}
