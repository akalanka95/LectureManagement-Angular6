import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from '../models/Student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    passingStudent: Student;
    studentChanged = new EventEmitter<Student[]>();

    constructor(private http: HttpClient) { }
    getListOfStudents() {
        const url = '/api/students/findAll';
        return this.http.get
        (url, { headers: new HttpHeaders
            ({'x-auth-token' : localStorage.
                getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }

    getStudentByID(studentId) {
        const url = '/api/students/findById/' + studentId;
        return this.http.get
        (url, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
    postNewStudent(newStudent: Student) {
        const url = '/api/students/addStudent';
        return this.http.post
        (url, newStudent, { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
    updateStudent(updateStudent: Student) {
        const url = '/api/students/updateStudent';
        return this.http.put
        (url, updateStudent , { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });

    }
    deleteStudent(student: Student) {
        const url = '/api/students/deleteStudent';
        return this.http.put
        (url, student , { headers: new HttpHeaders({'x-auth-token' : localStorage
                    .getItem('xAuthToken').valueOf().substring(10, 46) })
        });
    }
}
