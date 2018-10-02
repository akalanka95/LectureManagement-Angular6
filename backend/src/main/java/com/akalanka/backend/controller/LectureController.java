package com.akalanka.backend.controller;

import com.akalanka.backend.model.Lecture;
import com.akalanka.backend.model.Student;
import com.akalanka.backend.services.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/lectures")
public class LectureController {
    @Autowired
    private LectureService lectureService;

    @RequestMapping("/findAll")
    public List<Lecture> findAll(){
        return  lectureService.findAll();
    }

    @PutMapping("/updateAll")
    public List<Lecture> updateAttendance(@RequestBody List<Lecture> lectures){
        return  lectureService.saveAll(lectures);
    }
    @PutMapping("/update")
    public Lecture updateLecture(@RequestBody Lecture lectures){
        return  lectureService.save(lectures);
    }
    @RequestMapping("/addLecture")
    public Lecture saveLecture(@RequestBody Lecture lecture){
        return lectureService.save(lecture);
    }

    @RequestMapping("/findById/{lecId}")
    public Lecture findbyId(@PathVariable("lecId") Integer lecId){
        return  lectureService.findById(lecId);
    }

    @RequestMapping("/deleteLecture")
    public void deleteLecture(@RequestBody Lecture lecture){
        lectureService.delete(lecture);
    }


}
