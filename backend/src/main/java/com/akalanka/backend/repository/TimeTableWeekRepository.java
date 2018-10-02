package com.akalanka.backend.repository;

import com.akalanka.backend.model.TimeTable;
import com.akalanka.backend.model.TimeTableWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface TimeTableWeekRepository extends JpaRepository<TimeTableWeek , Integer> {
    Iterable<TimeTableWeek> findBySemesterIdAndCourseId(@Param("semId") Integer semId,
                                                        @Param("couId") Integer couId );
    Iterable<TimeTableWeek> findBySemesterIdAndWeekId(@Param("semId") Integer semId,
                                                        @Param("weekId") Integer weekId );

    Iterable<TimeTableWeek> findBySemesterId(@Param("semId") Integer semId );

}
