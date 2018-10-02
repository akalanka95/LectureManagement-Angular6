import {Component, OnInit, ViewChild} from '@angular/core';
import {Student} from '../../../models/Student.model';
import {Department} from '../../../models/Department.model';
import {Lecture} from '../../../models/Lecture.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StudentService} from '../../../services/student.service';
import {DepartmentService} from '../../../services/department.service';
import {LectureService} from '../../../services/lecture.service';
import {NgForm} from '@angular/forms';
import {Attendance} from '../../../models/Attendance.model';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {
    @ViewChild('f') addLectureForm: NgForm;
    departmentList: Department [] = [];
    addOrEdit = true;
    buttonName = 'Add Student';
    isFocused = ' ';
    lectureId: number;
    lectureName: string;
    lectureEmail: string;
    lectureAddres: string;
    lectureContact: string ;
    lectureRole: string ;
    lectureCode: string;
    imagePath = '../assets/img/faces/marc.jpg';
    lectureImageUrl: string;
    lectureDepartment: Department = null;
    lectureObject: Lecture = new Lecture();
    attendance: Attendance = new Attendance();
    selectedFile: File = null;
    passedLecture: Lecture;
  constructor(private lectureService: LectureService,
              private departmentService: DepartmentService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
      this.passedLecture = this.lectureService.passingLecture;
      if (this.passedLecture != null) {
          this.isFocused = 'is-focused';
          this.buttonName = 'Update';
          this.addOrEdit = false;
          this.lectureId = this.passedLecture.id;
          this.lectureName = this.passedLecture.fullName;
          this.lectureRole = this.passedLecture.role;
          this.lectureEmail = this.passedLecture.email;
          this.lectureAddres = this.passedLecture.address;
          this.lectureContact = this.passedLecture.contact;
          this.lectureCode = this.passedLecture.code;
          this.imagePath =  this.passedLecture.imageUrl ;
      }
      this.departmentService.getListOfDepartments()
          .subscribe(
              (departmentList: any[]) => {
                  this.departmentList = departmentList;
              },
              (error) => console.log(error)
          );
  }
  onSubmit(form: NgForm) {
    console.log(this.lectureName);
      this.attendance.friday = true;
      this.attendance.thursday = true;
      this.attendance.wednesday = true;
      this.attendance.tuesday = true;
      this.attendance.monday = true;
      this.lectureObject.attendance = this.attendance;
      this.lectureObject.active = true;
      this.lectureObject.fullName = this.lectureName;
      this.lectureObject.department = this.lectureDepartment;
      this.lectureObject.contact = this.lectureContact;
      this.lectureObject.address = this.lectureAddres;
      this.lectureObject.email = this.lectureEmail;
      this.lectureObject.role = this.lectureRole;
      this.lectureObject.code = this.lectureCode;
      console.log('this is the lecture Object');
      console.log(this.lectureObject);

      this.lectureImageUrl = 'LC' + this.lectureName + '.' +
          this.selectedFile.name.substr( this.selectedFile.name.lastIndexOf('.') + 1);
      this.lectureObject.imageUrl = this.lectureImageUrl;
      console.log(this.lectureObject);
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.lectureImageUrl );
      this.http.post('http://localhost:8080/api/uploades/images', fd,
          {
              headers: new HttpHeaders({
                  'x-auth-token':
                      localStorage.getItem('xAuthToken').valueOf().substring(10, 46)
              })
          }).subscribe(res => {
              console.log(res);
          },
          (error) => console.log(error)
      );
      if (this.addOrEdit) {
          this.lectureService.postNewLecture(this.lectureObject)
              .subscribe(
                  (response) => console.log(response),
                  (error) => console.log(error)
              );
          this.addLectureForm.resetForm();
      } else {
          this.lectureObject.id = this.lectureId;
          this.lectureService.updateLecture(this.lectureObject)
              .subscribe(
                  (response) => console.log(response),
                  (error) => console.log(error)
              );
      }
      /*this.lectureService.postNewLecture(this.lectureObject)
          .subscribe(
              (response) => console.log(response),
              (error) => console.log(error)
          );
      this.addLectureForm.resetForm();*/
  }
    selectDepartment(departments) {
        console.log(departments);
        this.lectureDepartment = departments;
    }
    onFileSelcted(event) {
        this.selectedFile = <File>event.target.files[0];
        console.log(this.selectedFile);
    }

}
