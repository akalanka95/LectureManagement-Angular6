package com.akalanka.backend.controller;

import com.akalanka.backend.model.Course;
import com.akalanka.backend.model.Student;
import com.akalanka.backend.model.TimeTable;
import com.akalanka.backend.services.CourseService;
import com.akalanka.backend.services.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( value =  {"api/timeTables" , "frontend/timeTables"})
public class TimeTableController {
    @Autowired
    private TimeTableService timeTableService;

    @RequestMapping("/findAll")
    public List<TimeTable> findAll(){
        return  timeTableService.findAll();
    }

    @RequestMapping("/addTimeTable")
    public TimeTable addTimeTable(@RequestBody TimeTable timeTable){
        return  timeTableService.save(timeTable);
    }

    @RequestMapping("/findBySemester/{id}")
    public Iterable<TimeTable> findOne(@PathVariable("id") Integer id){
        return  timeTableService.findBySemesterId(id);
    }

    @RequestMapping("/updateEnableByMonday/{active}")
    public void updateMonday(@PathVariable("active") boolean actives){
        System.out.println(" Time Table Comes to the controller");
        timeTableService.updateEnableByMonday(actives);
    }

    @RequestMapping("/listOfTimeTableBySemesterAndLecture/{semId}/{lecId}")
    public Iterable<TimeTable> listOfTimeTableBySemesterAndLecture(
            @PathVariable("semId") Integer semId,
            @PathVariable("lecId") Integer lecId){
        System.out.println("listOfTimeTableBySemesterAndLecture Comes to the controller");
        return timeTableService.findBySemesterIdAndLectureId(semId , lecId);
    }

    @RequestMapping("/listOfTimeTableBySemesterORLecture/{semId}/{lecId}")
    public Iterable<TimeTable> listOfTimeTableBySemesterORLecture(
            @PathVariable("semId") Integer semId,
            @PathVariable("lecId") Integer lecId){
        System.out.println("listOfTimeTableBySemesterORLecture Comes to the controller");
        return timeTableService.findBySemesterIdORLectureId(semId , lecId);
    }

    @RequestMapping("/listOfTimeTableByDay/{day}")
    public Iterable<TimeTable> listOfTimeTableByDay(
            @PathVariable("day") Integer day ){
        System.out.println("listOfTimeTableByDay Day day day");
        return timeTableService.findByDateId(day);
    }

    @RequestMapping("/listOfTimeTableByWeek")
    public Iterable<TimeTable> listOfTimeTableByDay(){
        System.out.println("listOfTimeTableByWeek Week Week");
        return timeTableService.findByWeek();
    }

    @RequestMapping("/listOfTimeTableByLectureId/{lecId}")
    public Iterable<TimeTable> listOfTimeTableByLectureId( @PathVariable("lecId") Integer lecId ){
        System.out.println("listOfTimeTableByLectureId lecture Id");
        return timeTableService.findByLectureId(lecId);
    }

    @RequestMapping("/delete")
    public void delete(@RequestBody TimeTable timeTable){
        timeTableService.delete(timeTable);
    }

    @PutMapping("/updateSubject")
    public TimeTable updateStudent(@RequestBody TimeTable timeTable){
        return  timeTableService.save(timeTable);
    }


}
