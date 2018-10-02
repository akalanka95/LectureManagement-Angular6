package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.Day;
import com.akalanka.backend.repository.DayRepository;
import com.akalanka.backend.services.DayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("dayService")
public class DayServiceImp implements DayService {

    @Autowired
    private DayRepository dayRepository;
    @Override
    public List<Day> findAll() {
        return dayRepository.findAll();
    }

    @Override
    public Day save(Day day) {
        return dayRepository.save(day);
    }

    @Override
    public List<Day> saveAll(List<Day> day) {
        return dayRepository.save(day);
    }
}
