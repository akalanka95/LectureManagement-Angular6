package com.akalanka.backend.controller;

import com.akalanka.backend.model.Course;
import com.akalanka.backend.model.Semester;
import com.akalanka.backend.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = { "api/courses" , "frontend/courses"})
public class CourseController {
    @Autowired
    private CourseService courseService;

    @RequestMapping("/findAll")
    public List<Course> findAll(){
        return  courseService.findAll();
    }

    @RequestMapping("/addCourse")
    public Course addCourse(@RequestBody Course course){
        return  courseService.save(course);
    }

    @RequestMapping("/findBySemesterId/{semId}")
    public Iterable<Course> findOne(@PathVariable("semId") Integer semId){
        return  courseService.findBySemesterId(semId);
    }

    @RequestMapping("/findById/{couId}")
    public Course findbyId(@PathVariable("couId") Integer couId){
        return  courseService.findById(couId);
    }


}
