package com.akalanka.backend.controller;

import com.akalanka.backend.model.TimeTableWeek;
import com.akalanka.backend.repository.TimeTableWeekRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = {"api/timeTablesWeek" , "frontend/timeTablesWeek"})
public class TimeTableWeekController {
    @Autowired
    private TimeTableWeekRepository timeTableWeekRepository;

    @RequestMapping("/save")
    public List<TimeTableWeek> save(@RequestBody List<TimeTableWeek> timeTableWeek){
        return  timeTableWeekRepository.save(timeTableWeek);
    }

    @RequestMapping("/semIdAndcouId/{semId}/{couId}")
    public Iterable<TimeTableWeek> findBysemIdAndcouId(@PathVariable("semId") Integer semId,
                                                       @PathVariable("couId") Integer couId){
        return  timeTableWeekRepository.findBySemesterIdAndCourseId(semId , couId);
    }
    @RequestMapping("/semIdAndweekId/{semId}/{weekId}")
    public Iterable<TimeTableWeek> findBysemIdAndweekId(@PathVariable("semId") Integer semId,
                                                       @PathVariable("weekId") Integer weekId){
        return  timeTableWeekRepository.findBySemesterIdAndWeekId(semId , weekId);
    }
    @RequestMapping("/semIdAndAllWeekId/{semId}")
    public Iterable<TimeTableWeek> findBysemIdAndAllWeekId(@PathVariable("semId") Integer semId){
        return  timeTableWeekRepository.findBySemesterId(semId);
    }

}
