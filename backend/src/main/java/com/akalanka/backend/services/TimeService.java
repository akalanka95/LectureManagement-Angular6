package com.akalanka.backend.services;

import com.akalanka.backend.model.Lecture;
import com.akalanka.backend.model.Time;

import java.util.List;

public interface TimeService {
    List<Time> findAll();
    Time save(Time time);
    Time findById(Integer timeId);
}
