package com.akalanka.backend.controller;


import com.akalanka.backend.model.LectureHall;
import com.akalanka.backend.model.Semester;
import com.akalanka.backend.services.LectureHallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/halls")
public class LectureHallControler {
    @Autowired
    private LectureHallService lectureHallService;

    @RequestMapping("/findAll")
    public List<LectureHall> findAll(){
        return  lectureHallService.findAll();
    }

    @RequestMapping("/findById/{hallId}")
    public LectureHall findbyId(@PathVariable("hallId") Integer hallId){
        return  lectureHallService.findById(hallId);
    }
}
