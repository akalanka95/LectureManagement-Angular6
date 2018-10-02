package com.akalanka.backend.services;

import com.akalanka.backend.model.Student;

import java.util.List;

public interface StudentService {
    List<Student> findAllActiveStudents();

    List<Student> findAll();

    Student findOne(Integer id);

    Student save(Student student);

    void delete(Student student);

    void removeOne(Integer id);
}
