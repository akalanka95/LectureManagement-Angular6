package com.akalanka.backend.repository;


import com.akalanka.backend.model.Lecture;
import com.akalanka.backend.model.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface LectureRepository extends JpaRepository<Lecture , Integer> {
    Lecture findById(@Param("lecId") Integer lecId);
}
