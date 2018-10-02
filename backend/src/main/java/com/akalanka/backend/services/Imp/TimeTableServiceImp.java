package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.TimeTable;
import com.akalanka.backend.repository.TimeTableRepository;
import com.akalanka.backend.services.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("timeTableService")
public class TimeTableServiceImp implements TimeTableService {
    @Autowired
    private TimeTableRepository timeTableRepository;

    @Override
    public List<TimeTable> findAll() {
        return timeTableRepository.findAll();
    }

    @Override
    public TimeTable save(TimeTable timeTable) {
        return timeTableRepository.save(timeTable);
    }

    @Override
    public void delete(TimeTable timeTable) {
        timeTableRepository.delete(timeTable);
    }

    @Override
    public Iterable<TimeTable>  findBySemesterId(Integer semesterID) {
        return  timeTableRepository.findBySemesterId(semesterID);
    }

    @Override
    @Transactional
    public void updateEnableByMonday(boolean actives) {
        System.out.println("Time Table This workkkkkkkk");
        timeTableRepository.updateEnableByMonday(actives);
    }

    @Override
    public Iterable<TimeTable> findBySemesterIdAndLectureId(Integer semId, Integer lecId) {
        return timeTableRepository.findBySemesterIdAndLectureId(semId, lecId);
    }
    @Override
    public Iterable<TimeTable> findBySemesterIdORLectureId(Integer semId, Integer lecId) {
        return timeTableRepository.findBySemesterIdOrLectureId(semId, lecId);
    }

    @Override
    public Iterable<TimeTable> findByDateId(Integer dayId) {
        return timeTableRepository.findByDateId(dayId);
    }

    @Override
    public Iterable<TimeTable> findByWeek() {
        return timeTableRepository.findByWeek();
    }

    @Override
    public Iterable<TimeTable> findByLectureId(Integer lecId) {
        return timeTableRepository.findByLectureId(lecId);
    }
}
