package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.LectureHall;
import com.akalanka.backend.repository.LectureHallRepository;
import com.akalanka.backend.services.LectureHallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("lectureHallService")
public class LectureHallServiceImp implements LectureHallService {
    @Autowired
    private LectureHallRepository lectureHallRepository;
    @Override
    public List<LectureHall> findAll() {
        return lectureHallRepository.findAll();
    }

    @Override
    public LectureHall save(LectureHall lectureHall) {
        return lectureHallRepository.save(lectureHall);
    }

    @Override
    public LectureHall findById(Integer hallId) {
        return lectureHallRepository.findById(hallId);
    }
}
