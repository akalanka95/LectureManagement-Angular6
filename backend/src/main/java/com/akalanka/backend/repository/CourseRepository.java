package com.akalanka.backend.repository;

import com.akalanka.backend.model.Course;
import com.akalanka.backend.model.Semester;
import com.akalanka.backend.model.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    Iterable<Course> findBySemesterId (@Param("semId") Integer id);
    Course findById(@Param("couId") Integer couId);

}
