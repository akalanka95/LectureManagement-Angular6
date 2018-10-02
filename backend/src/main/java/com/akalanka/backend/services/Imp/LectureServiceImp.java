package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.Lecture;
import com.akalanka.backend.model.Semester;
import com.akalanka.backend.repository.LectureRepository;
import com.akalanka.backend.services.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("lectureService")
public class LectureServiceImp implements LectureService {
    @Autowired
    private LectureRepository lectureRepository;

    @Override
    public List<Lecture> findAll() {
        return lectureRepository.findAll();
    }

    @Override
    public Lecture save(Lecture lecture) {
        return lectureRepository.save(lecture);
    }

    @Override
    public List<Lecture> saveAll(List<Lecture> lectures) {
        return lectureRepository.save(lectures);
    }

    @Override
    public Lecture findById(Integer lecId) {
        return lectureRepository.findById(lecId);
    }

    @Override
    public void delete(Lecture lecture) {
        lectureRepository.delete(lecture);
    }
}
