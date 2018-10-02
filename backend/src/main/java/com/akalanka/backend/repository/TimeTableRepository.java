package com.akalanka.backend.repository;

import com.akalanka.backend.model.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TimeTableRepository extends JpaRepository<TimeTable , Integer>{
    Iterable<TimeTable> findBySemesterId(@Param("id") Integer id);

    @Modifying
    @Query("UPDATE TimeTable c SET c.active = :actives WHERE c.date = 1")
    void updateEnableByMonday(@Param("actives") boolean actives);

    Iterable<TimeTable> findBySemesterIdAndLectureId(@Param("semId") Integer semId,
                                                     @Param("lecId") Integer lecId);

    Iterable<TimeTable> findBySemesterIdOrLectureId(@Param("semId") Integer semId,
                                                     @Param("lecId") Integer lecId);

    Iterable<TimeTable> findByDateId(@Param("dayId") Integer dayId);

    Iterable<TimeTable> findByLectureId(@Param("lecId") Integer lecId);

            @Modifying
            @Query("SELECT  c FROM TimeTable c WHERE c.tWeek = true")
            Iterable<TimeTable> findByWeek();

}
