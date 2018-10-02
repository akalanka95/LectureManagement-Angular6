package com.akalanka.backend.controller;


import com.akalanka.backend.model.Day;
import com.akalanka.backend.model.Lecture;
import com.akalanka.backend.services.DayService;
import com.akalanka.backend.services.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/days")
public class DayController {
    @Autowired
    private DayService dayService;

    @RequestMapping("/findAll")
    public List<Day> findAll(){
        return  dayService.findAll();
    }

    @PutMapping("/updateAll")
    public List<Day> updateDay(@RequestBody List<Day> day){
        return  dayService.saveAll(day);
    }



}
