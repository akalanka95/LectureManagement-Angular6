package com.akalanka.backend.controller;

import com.akalanka.backend.model.Course;
import com.akalanka.backend.model.Lecture;
import com.akalanka.backend.model.Semester;
import com.akalanka.backend.services.CourseService;
import com.akalanka.backend.services.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = {"api/semesters" , "frontend/semesters"})
public class SemesterController {
    @Autowired
    private SemesterService semesterService;

    @RequestMapping("/findAll")
    public List<Semester> findAll(){
        return  semesterService.findAll();
    }

    @RequestMapping("/addSemester")
    public Semester addSemester(@RequestBody Semester semester){
        return  semesterService.save(semester);
    }

    @RequestMapping("/findById/{semId}")
    public Semester findbyId(@PathVariable("semId") Integer semId){
        return  semesterService.findById(semId);
    }
}
