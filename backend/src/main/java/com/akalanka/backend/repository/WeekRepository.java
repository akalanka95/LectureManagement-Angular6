package com.akalanka.backend.repository;

import com.akalanka.backend.model.Week;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WeekRepository extends JpaRepository<Week, Integer>{

}
