package com.akalanka.backend.repository;

import com.akalanka.backend.model.LectureHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface LectureHallRepository extends JpaRepository<LectureHall , Integer> {
    LectureHall findById(@Param("hallId") Integer hallId);
}
