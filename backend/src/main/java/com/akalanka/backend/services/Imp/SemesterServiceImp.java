package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.Semester;
import com.akalanka.backend.repository.SemesterRepository;
import com.akalanka.backend.services.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("semesterService")
public class SemesterServiceImp implements SemesterService {
    @Autowired
    private SemesterRepository semesterRepository;
    @Override
    public List<Semester> findAll() {
        return semesterRepository.findAll();
    }

    @Override
    public Semester save(Semester semester) {
        return semesterRepository.save(semester);
    }

    @Override
    public Semester findById(Integer semId) {
        return semesterRepository.findById(semId);
    }
}
