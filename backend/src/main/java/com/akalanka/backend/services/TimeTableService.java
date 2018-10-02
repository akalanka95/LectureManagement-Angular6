package com.akalanka.backend.services;

import com.akalanka.backend.model.TimeTable;

import java.util.List;

public interface TimeTableService {
    List<TimeTable> findAll();
    TimeTable save(TimeTable timeTable);
    void delete(TimeTable timeTable);
    Iterable<TimeTable>  findBySemesterId(Integer semesterID);
    void updateEnableByMonday(boolean actives);
    Iterable<TimeTable>  findBySemesterIdAndLectureId(Integer semId , Integer lecId);
    Iterable<TimeTable>  findBySemesterIdORLectureId(Integer semId , Integer lecId);
    Iterable<TimeTable>  findByDateId(Integer dayId);
    Iterable<TimeTable>  findByWeek();
    Iterable<TimeTable>  findByLectureId(Integer lecId);


}
