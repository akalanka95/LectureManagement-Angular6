package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.Lecture;
import com.akalanka.backend.model.Time;
import com.akalanka.backend.repository.TimeRepository;
import com.akalanka.backend.services.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("timeService")
public class TimeServiceImp implements TimeService {
    @Autowired
    private TimeRepository timeRepository;
    @Override
    public List<Time> findAll() {
        return timeRepository.findAll();
    }

    @Override
    public Time save(Time time) {
        return timeRepository.save(time);
    }

    @Override
    public Time findById(Integer timeId) {
        return timeRepository.findById(timeId);
    }
}
