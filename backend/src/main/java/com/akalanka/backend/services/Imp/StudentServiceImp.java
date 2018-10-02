package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.Student;
import com.akalanka.backend.repository.StudentRepository;
import com.akalanka.backend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("studentService")
public class StudentServiceImp implements StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<Student> findAllActiveStudents() {
        List<Student> studentList = (List<Student>) studentRepository.findAll();

        List<Student> activeBooks = new ArrayList<>();
        for(Student student: studentList){
            if(student.isActive()){
                activeBooks.add(student);
            }
        }
        return studentList;
    }

    @Override
    public List<Student> findAll() {
        List<Student> students = (List<Student>) studentRepository.findAll();
        return students;
    }

    @Override
    public Student findOne(Integer id) {
        return studentRepository.findOne(id);
    }

    @Override
    public Student save(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public void delete(Student student) {
         studentRepository.delete(student);
    }

    @Override
    public void removeOne(Integer id) {
         studentRepository.delete(id);
    }

}
