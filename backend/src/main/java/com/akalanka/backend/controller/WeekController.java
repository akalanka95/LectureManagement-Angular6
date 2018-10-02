package com.akalanka.backend.controller;

import com.akalanka.backend.model.Week;
import com.akalanka.backend.repository.WeekRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = {"api/weeks" , "frontend/weeks"})
public class WeekController {
    @Autowired
    private WeekRepository weekRepository;

    @RequestMapping("/findWeek")
    public List<Week> findWeek(){
        return weekRepository.findAll();
    }
    @RequestMapping("/saveWeek")
    public List<Week> saveWeek(@RequestBody List<Week> week){
        return weekRepository.save(week);
    }

}

