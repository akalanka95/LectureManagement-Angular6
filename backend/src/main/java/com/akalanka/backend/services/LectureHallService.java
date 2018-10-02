package com.akalanka.backend.services;

import com.akalanka.backend.model.LectureHall;
import com.akalanka.backend.model.Time;

import java.util.List;

public interface LectureHallService {
    List<LectureHall> findAll();
    LectureHall save(LectureHall lectureHall);

    LectureHall findById(Integer hallId);
}
