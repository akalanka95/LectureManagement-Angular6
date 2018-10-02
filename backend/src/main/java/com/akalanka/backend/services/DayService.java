package com.akalanka.backend.services;

import com.akalanka.backend.model.Day;
import com.akalanka.backend.model.Department;
import com.akalanka.backend.model.Lecture;

import java.util.List;

public interface DayService  {
    List<Day> findAll();
    Day save(Day day);
    List<Day> saveAll(List<Day> day);
}
