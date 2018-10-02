package com.akalanka.backend.repository;

import com.akalanka.backend.model.Lecture;
import com.akalanka.backend.model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface SemesterRepository extends JpaRepository<Semester , Integer> {
    Semester findById(@Param("semId") Integer semId);
}
