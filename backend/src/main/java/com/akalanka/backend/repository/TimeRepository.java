package com.akalanka.backend.repository;

import com.akalanka.backend.model.Time;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface TimeRepository extends JpaRepository<Time, Integer> {
    Time findById(@Param("timeId") Integer timeId);
}
