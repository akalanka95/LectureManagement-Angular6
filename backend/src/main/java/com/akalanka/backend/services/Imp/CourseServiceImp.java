package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.Course;
import com.akalanka.backend.repository.CourseRepository;
import com.akalanka.backend.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("courseService")
public class CourseServiceImp implements CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    @Override
    public Course save(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Iterable<Course> findBySemesterId(Integer semId) {
        return courseRepository.findBySemesterId(semId);
    }

    @Override
    public Course findById(Integer couId) {
        return courseRepository.findById(couId);
    }
}
