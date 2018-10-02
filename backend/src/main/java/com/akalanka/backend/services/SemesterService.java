package com.akalanka.backend.services;


import com.akalanka.backend.model.Semester;

import java.util.List;

public interface SemesterService {
    List<Semester> findAll();
    Semester save(Semester semester);
    Semester findById(Integer semId);
}
