package com.akalanka.backend.services;

import com.akalanka.backend.model.Course;

import java.util.List;

public interface CourseService {
    List<Course> findAll();
    Course save(Course course);
    Iterable<Course> findBySemesterId(Integer semId);
    Course findById(Integer couId);
}
